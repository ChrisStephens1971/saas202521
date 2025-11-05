import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { randomUUID } from "crypto";
import { graphClient, initializeGraphClient } from "./lib/graphClient";
import { logToAppInsights } from "./lib/logging";
import { validateProvisionPayload, validateRollbackPayload } from "./lib/validation";

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

      const { firstName, lastName, jobTitle, department, manager } = payload;

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

      // TODO: In PR 5, implement real Graph calls
      // For now, return mock success response
      const mockResponse = {
        upn,
        correlationId,
        userId: "mock-user-id",
        groups: ["mock-group-id"],
        licenseAssigned: true,
        message: "User provisioned successfully (mock mode)"
      };

      context.log(`[${correlationId}] Provision completed successfully`);

      await logToAppInsights({
        correlationId,
        operation: "provision",
        status: "success",
        upn,
        result: mockResponse
      });

      return {
        status: 200,
        jsonBody: mockResponse
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

      const { upn, groups, siteId, correlationId: originalCorrelationId } = payload;

      context.log(`[${correlationId}] Rolling back user: ${upn}`);

      // Log to App Insights
      await logToAppInsights({
        correlationId,
        operation: "rollback",
        status: "started",
        upn,
        originalCorrelationId
      });

      // TODO: In PR 5, implement real Graph calls
      // For now, return mock success response
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

      context.log(`[${correlationId}] Rollback completed successfully`);

      await logToAppInsights({
        correlationId,
        operation: "rollback",
        status: "success",
        upn,
        result: mockResponse
      });

      return {
        status: 200,
        jsonBody: mockResponse
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
