/**
 * Logging utilities for Application Insights
 */

interface LogData {
  correlationId: string;
  operation: string;
  status: string;
  [key: string]: any;
}

/**
 * Log structured data to Application Insights
 * In PR 1, this logs to console. In later PRs, will use App Insights SDK.
 */
export async function logToAppInsights(data: LogData): Promise<void> {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ...data
  };

  // For now, log to console (structured JSON)
  console.log(JSON.stringify(logEntry));

  // TODO: In future PRs, send to App Insights
  // const appInsights = require("applicationinsights");
  // appInsights.defaultClient.trackEvent({
  //   name: data.operation,
  //   properties: data
  // });
}

/**
 * Log error with context
 */
export async function logError(
  correlationId: string,
  operation: string,
  error: Error | any
): Promise<void> {
  await logToAppInsights({
    correlationId,
    operation,
    status: "error",
    errorMessage: error.message,
    errorStack: error.stack
  });
}
