import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { randomUUID } from "crypto";
import { graphClient, initializeGraphClient, isGraphClientAvailable } from "./lib/graphClient";
import { logToAppInsights } from "./lib/logging";
import { validateProvisionPayload, validateRollbackPayload } from "./lib/validation";
import * as graphOps from "./lib/graphOperations";

// Initialize Graph client on cold start
initializeGraphClient();

/**
 * Provision HTTP Function
 * Creates a new user in M365 with license and group assignments
 */
app.http("provision", {
  methods: ["POST"],
  authLevel: "function",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    const correlationId = randomUUID();
    context.log(`[${correlationId}] Provision request received`);

    try {
      // Parse and validate payload
      const payload = await req.json() as any;
      const validation = validateProvisionPayload(payload);

      if (!validation.isValid) {
        context.log(`[${correlationId}] Validation failed: ${validation.errors.join(", ")}`);
        return {
          status: 400,
          jsonBody: {
            error: "Validation failed",
            details: validation.errors,
            correlationId
          }
        };
      }

      const { firstName, lastName, jobTitle, department, manager, role } = payload;

      // Generate UPN
      const upn = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${process.env.FTD_DOMAIN}`;

      context.log(`[${correlationId}] Creating user: ${upn}`);

      // Log to App Insights
      await logToAppInsights({
        correlationId,
        operation: "provision",
        status: "started",
        upn,
        payload
      });

      // Check if Graph client is available (real mode vs. mock mode)
      if (!isGraphClientAvailable()) {
        context.warn(`[${correlationId}] Graph client not available, running in mock mode`);
        const mockResponse = {
          upn,
          correlationId,
          userId: "mock-user-id",
          groups: ["mock-group-id"],
          licenseAssigned: true,
          message: "User provisioned successfully (mock mode)"
        };

        await logToAppInsights({
          correlationId,
          operation: "provision",
          status: "success",
          upn,
          result: mockResponse,
          mode: "mock"
        });

        return {
          status: 200,
          jsonBody: mockResponse
        };
      }

      // Real Graph API implementation
      const client = graphClient();

      // Step 1: Create user in Azure AD
      context.log(`[${correlationId}] Creating user in Azure AD`);
      const createdUser = await graphOps.createUser(
        client,
        firstName,
        lastName,
        upn,
        jobTitle,
        department
      );
      context.log(`[${correlationId}] User created: ${createdUser.id}`);

      // Step 2: Assign license
      context.log(`[${correlationId}] Assigning license`);
      const licenseSkuId = await graphOps.findLicenseSku(client, "Office 365 E3");
      let licenseAssigned = false;

      if (licenseSkuId) {
        await graphOps.assignLicense(client, createdUser.id, licenseSkuId);
        licenseAssigned = true;
        context.log(`[${correlationId}] License assigned successfully`);
      } else {
        context.warn(`[${correlationId}] License SKU not found, skipping license assignment`);
      }

      // Step 3: Get groups based on role and department
      const groupNames = await graphOps.getGroupsForUser(role || jobTitle, department);
      context.log(`[${correlationId}] Adding user to ${groupNames.length} groups: ${groupNames.join(", ")}`);

      // Step 4: Add user to groups
      const addedGroupIds = await graphOps.addUserToGroups(client, createdUser.id, groupNames);
      context.log(`[${correlationId}] User added to ${addedGroupIds.length} groups`);

      const response = {
        upn,
        correlationId,
        userId: createdUser.id,
        groups: addedGroupIds,
        licenseAssigned,
        message: "User provisioned successfully"
      };

      context.log(`[${correlationId}] Provision completed successfully`);

      await logToAppInsights({
        correlationId,
        operation: "provision",
        status: "success",
        upn,
        userId: createdUser.id,
        groupCount: addedGroupIds.length,
        licenseAssigned,
        result: response
      });

      return {
        status: 200,
        jsonBody: response
      };

    } catch (error: any) {
      context.error(`[${correlationId}] Provision failed:`, error);

      await logToAppInsights({
        correlationId,
        operation: "provision",
        status: "error",
        error: error.message
      });

      return {
        status: 500,
        jsonBody: {
          error: "Provision failed",
          message: error.message,
          correlationId
        }
      };
    }
  }
});

/**
 * Rollback HTTP Function
 * Disables user, removes license, removes from groups (best-effort)
 */
app.http("rollback", {
  methods: ["POST"],
  authLevel: "function",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    const correlationId = randomUUID();
    context.log(`[${correlationId}] Rollback request received`);

    try {
      // Parse and validate payload
      const payload = await req.json() as any;
      const validation = validateRollbackPayload(payload);

      if (!validation.isValid) {
        context.log(`[${correlationId}] Validation failed: ${validation.errors.join(", ")}`);
        return {
          status: 400,
          jsonBody: {
            error: "Validation failed",
            details: validation.errors,
            correlationId
          }
        };
      }

      const { upn, groups, siteId, correlationId: originalCorrelationId, userId, licenseSkuId } = payload;

      context.log(`[${correlationId}] Rolling back user: ${upn}`);

      // Log to App Insights
      await logToAppInsights({
        correlationId,
        operation: "rollback",
        status: "started",
        upn,
        originalCorrelationId
      });

      // Check if Graph client is available (real mode vs. mock mode)
      if (!isGraphClientAvailable()) {
        context.warn(`[${correlationId}] Graph client not available, running in mock mode`);
        const mockResponse = {
          rolledBack: true,
          correlationId,
          upn,
          operations: {
            userDisabled: true,
            licenseRemoved: true,
            groupsRemoved: groups || [],
            siteDeleted: siteId ? true : false
          },
          message: "Rollback completed successfully (mock mode)"
        };

        await logToAppInsights({
          correlationId,
          operation: "rollback",
          status: "success",
          upn,
          result: mockResponse,
          mode: "mock"
        });

        return {
          status: 200,
          jsonBody: mockResponse
        };
      }

      // Real Graph API implementation (best-effort)
      const client = graphClient();
      const operations: any = {
        userDisabled: false,
        licenseRemoved: false,
        groupsRemoved: [],
        siteDeleted: false
      };

      try {
        // Step 1: Get user ID if not provided
        let userIdToUse = userId;
        if (!userIdToUse) {
          context.log(`[${correlationId}] Looking up user by UPN`);
          const userResult = await client.api(`/users/${upn}`).get();
          userIdToUse = userResult.id;
          context.log(`[${correlationId}] Found user: ${userIdToUse}`);
        }

        // Step 2: Remove from groups (best-effort)
        if (groups && groups.length > 0) {
          context.log(`[${correlationId}] Removing user from ${groups.length} groups`);
          await graphOps.removeUserFromGroups(client, userIdToUse, groups);
          operations.groupsRemoved = groups;
          context.log(`[${correlationId}] User removed from groups`);
        }

        // Step 3: Remove license (best-effort)
        if (licenseSkuId) {
          context.log(`[${correlationId}] Removing license`);
          await graphOps.removeLicense(client, userIdToUse, licenseSkuId);
          operations.licenseRemoved = true;
          context.log(`[${correlationId}] License removed`);
        }

        // Step 4: Disable user
        context.log(`[${correlationId}] Disabling user account`);
        await graphOps.disableUser(client, userIdToUse);
        operations.userDisabled = true;
        context.log(`[${correlationId}] User account disabled`);

        // Note: Site deletion not implemented (would require SharePoint API)
        if (siteId) {
          context.warn(`[${correlationId}] Site deletion not implemented (siteId: ${siteId})`);
        }

      } catch (error: any) {
        context.error(`[${correlationId}] Rollback operation failed (continuing):`, error);
        // Continue with best-effort approach
      }

      const response = {
        rolledBack: true,
        correlationId,
        upn,
        operations,
        message: "Rollback completed (best-effort)"
      };

      context.log(`[${correlationId}] Rollback completed`);

      await logToAppInsights({
        correlationId,
        operation: "rollback",
        status: "success",
        upn,
        operations,
        result: response
      });

      return {
        status: 200,
        jsonBody: response
      };

    } catch (error: any) {
      context.error(`[${correlationId}] Rollback failed:`, error);

      await logToAppInsights({
        correlationId,
        operation: "rollback",
        status: "error",
        error: error.message
      });

      return {
        status: 500,
        jsonBody: {
          error: "Rollback failed",
          message: error.message,
          correlationId
        }
      };
    }
  }
});
