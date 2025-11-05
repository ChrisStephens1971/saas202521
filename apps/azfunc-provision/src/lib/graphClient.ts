import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

let graphClientInstance: Client | null = null;

/**
 * Initialize Graph client with MSAL authentication
 * Uses confidential client flow for local dev and managed identity for cloud
 */
export function initializeGraphClient(): void {
  if (graphClientInstance) {
    return; // Already initialized
  }

  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    console.warn("Graph client credentials not configured. Running in mock mode.");
    return;
  }

  try {
    // Create credential
    const credential = new ClientSecretCredential(
      tenantId,
      clientId,
      clientSecret
    );

    // Create authentication provider
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ["https://graph.microsoft.com/.default"]
    });

    // Initialize Graph client
    graphClientInstance = Client.initWithMiddleware({
      authProvider
    });

    console.log("Graph client initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Graph client:", error);
    throw error;
  }
}

/**
 * Get the initialized Graph client instance
 */
export function graphClient(): Client {
  if (!graphClientInstance) {
    throw new Error("Graph client not initialized. Call initializeGraphClient() first.");
  }
  return graphClientInstance;
}

/**
 * Check if Graph client is available (not in mock mode)
 */
export function isGraphClientAvailable(): boolean {
  return graphClientInstance !== null;
}
