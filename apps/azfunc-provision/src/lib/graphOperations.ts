/**
 * Microsoft Graph API operations for user provisioning
 */

import { Client } from "@microsoft/microsoft-graph-client";
import * as fs from "fs";
import * as path from "path";

interface GroupMappings {
  roleMappings: Record<string, { groups: string[] }>;
  departmentMappings: Record<string, { groups: string[] }>;
  defaultLicense: string;
}

// Load group mappings from config
let groupMappingsCache: GroupMappings | null = null;

function loadGroupMappings(): GroupMappings {
  if (groupMappingsCache) {
    return groupMappingsCache;
  }

  const configPath = path.join(__dirname, "../../config/group-mappings.json");
  const configData = fs.readFileSync(configPath, "utf-8");
  groupMappingsCache = JSON.parse(configData);
  return groupMappingsCache!;
}

/**
 * Create a new user in Azure AD
 */
export async function createUser(
  graphClient: Client,
  firstName: string,
  lastName: string,
  upn: string,
  jobTitle: string,
  department: string
): Promise<any> {
  const user = {
    accountEnabled: true,
    displayName: `${firstName} ${lastName}`,
    mailNickname: `${firstName}.${lastName}`.toLowerCase(),
    userPrincipalName: upn,
    givenName: firstName,
    surname: lastName,
    jobTitle: jobTitle,
    department: department,
    passwordProfile: {
      forceChangePasswordNextSignIn: true,
      password: generateTemporaryPassword()
    }
  };

  const createdUser = await graphClient.api("/users").post(user);
  return createdUser;
}

/**
 * Assign license to user
 */
export async function assignLicense(
  graphClient: Client,
  userId: string,
  skuId: string
): Promise<void> {
  await graphClient.api(`/users/${userId}/assignLicense`).post({
    addLicenses: [
      {
        skuId: skuId
      }
    ],
    removeLicenses: []
  });
}

/**
 * Get groups for role and department
 */
export async function getGroupsForUser(
  role: string,
  department: string
): Promise<string[]> {
  const mappings = loadGroupMappings();
  const groups: string[] = [];

  // Add role-based groups
  if (role && mappings.roleMappings[role]) {
    groups.push(...mappings.roleMappings[role].groups);
  }

  // Add department-based groups
  if (department && mappings.departmentMappings[department]) {
    groups.push(...mappings.departmentMappings[department].groups);
  }

  // Remove duplicates
  return [...new Set(groups)];
}

/**
 * Find group ID by display name
 */
export async function findGroupByName(
  graphClient: Client,
  groupName: string
): Promise<string | null> {
  try {
    const result = await graphClient
      .api("/groups")
      .filter(`displayName eq '${groupName}'`)
      .select("id,displayName")
      .get();

    if (result.value && result.value.length > 0) {
      return result.value[0].id;
    }
    return null;
  } catch (error) {
    console.error(`Error finding group ${groupName}:`, error);
    return null;
  }
}

/**
 * Add user to groups
 */
export async function addUserToGroups(
  graphClient: Client,
  userId: string,
  groupNames: string[]
): Promise<string[]> {
  const addedGroups: string[] = [];

  for (const groupName of groupNames) {
    const groupId = await findGroupByName(graphClient, groupName);
    if (groupId) {
      try {
        await graphClient.api(`/groups/${groupId}/members/$ref`).post({
          "@odata.id": `https://graph.microsoft.com/v1.0/users/${userId}`
        });
        addedGroups.push(groupId);
      } catch (error) {
        console.error(`Error adding user to group ${groupName}:`, error);
      }
    } else {
      console.warn(`Group not found: ${groupName}`);
    }
  }

  return addedGroups;
}

/**
 * Disable user account
 */
export async function disableUser(
  graphClient: Client,
  userId: string
): Promise<void> {
  await graphClient.api(`/users/${userId}`).patch({
    accountEnabled: false
  });
}

/**
 * Remove user from groups
 */
export async function removeUserFromGroups(
  graphClient: Client,
  userId: string,
  groupIds: string[]
): Promise<void> {
  for (const groupId of groupIds) {
    try {
      await graphClient.api(`/groups/${groupId}/members/${userId}/$ref`).delete();
    } catch (error) {
      console.error(`Error removing user from group ${groupId}:`, error);
    }
  }
}

/**
 * Remove license from user
 */
export async function removeLicense(
  graphClient: Client,
  userId: string,
  skuId: string
): Promise<void> {
  await graphClient.api(`/users/${userId}/assignLicense`).post({
    addLicenses: [],
    removeLicenses: [skuId]
  });
}

/**
 * Get available licenses (SKUs)
 */
export async function getAvailableLicenses(
  graphClient: Client
): Promise<any[]> {
  const result = await graphClient.api("/subscribedSkus").get();
  return result.value || [];
}

/**
 * Find license SKU ID by name
 */
export async function findLicenseSku(
  graphClient: Client,
  licenseName: string
): Promise<string | null> {
  const skus = await getAvailableLicenses(graphClient);
  const sku = skus.find((s) => s.skuPartNumber.includes(licenseName) || s.displayName?.includes(licenseName));
  return sku ? sku.skuId : null;
}

/**
 * Generate a secure temporary password
 */
function generateTemporaryPassword(): string {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  // Ensure at least one of each required character type
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // uppercase
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // lowercase
  password += "0123456789"[Math.floor(Math.random() * 10)]; // number
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)]; // special

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
