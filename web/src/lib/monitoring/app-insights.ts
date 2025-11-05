/**
 * Azure Application Insights Configuration
 *
 * Centralized monitoring using Azure Application Insights
 * Captures errors, performance metrics, and user behavior.
 *
 * Setup:
 * 1. Create Application Insights resource in Azure Portal
 * 2. Get Connection String or Instrumentation Key
 * 3. Add NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING to .env.local
 * 4. Call initAppInsights() in your root layout
 *
 * Azure Portal: https://portal.azure.com
 * Pricing: 5GB/month free, then ~$2.30/GB
 */

import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js'

let appInsights: ApplicationInsights | null = null
let reactPlugin: ReactPlugin | null = null

/**
 * Get the React plugin instance for router instrumentation
 */
export function getReactPlugin(): ReactPlugin | null {
  return reactPlugin
}

/**
 * Initialize Azure Application Insights
 * Call this in your root layout or _app file
 */
export function initAppInsights() {
  const connectionString =
    process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING ||
    process.env.APPINSIGHTS_CONNECTION_STRING

  if (!connectionString) {
    console.warn('[App Insights] Connection string not configured, monitoring disabled')
    return
  }

  try {
    reactPlugin = new ReactPlugin()

    appInsights = new ApplicationInsights({
      config: {
        connectionString,
        enableAutoRouteTracking: true, // Track page views automatically
        enableCorsCorrelation: true, // Correlate frontend/backend requests
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,

        // Sampling - reduce data ingestion in production
        samplingPercentage: process.env.NODE_ENV === 'production' ? 10 : 100,

        // Disable automatic exception tracking if you want manual control
        disableExceptionTracking: false,

        // Disable cookies if privacy is a concern
        disableCookiesUsage: false,

        // Extensions
        extensions: [reactPlugin],

        // Telemetry initializer to filter sensitive data
        extensionConfig: {},
      },
    })

    appInsights.loadAppInsights()

    // Add telemetry initializer to remove sensitive data
    appInsights.addTelemetryInitializer((envelope) => {
      // Remove sensitive headers
      if (envelope.baseData) {
        const baseData = envelope.baseData as any

        if (baseData.properties) {
          // Remove authorization tokens
          delete baseData.properties.authorization
          delete baseData.properties.cookie
          delete baseData.properties['x-api-key']

          // Sanitize URLs with tokens
          if (baseData.properties.url) {
            baseData.properties.url = baseData.properties.url.replace(
              /token=[^&]*/gi,
              'token=[REDACTED]'
            )
          }
        }
      }

      return true // Return false to drop telemetry
    })

    console.log('[App Insights] Initialized successfully')
  } catch (error) {
    console.error('[App Insights] Failed to initialize:', error)
  }
}

/**
 * Get the Application Insights instance
 */
export function getAppInsights(): ApplicationInsights | null {
  return appInsights
}

/**
 * Track a custom event
 */
export function trackEvent(
  name: string,
  properties?: Record<string, any>,
  measurements?: Record<string, number>
) {
  if (!appInsights) return

  appInsights.trackEvent({
    name,
    properties,
    measurements,
  })
}

/**
 * Track a custom metric
 */
export function trackMetric(
  name: string,
  average: number,
  properties?: Record<string, any>
) {
  if (!appInsights) return

  appInsights.trackMetric({
    name,
    average,
    properties,
  })
}

/**
 * Track an exception/error
 */
export function trackException(
  error: Error,
  severityLevel?: number,
  properties?: Record<string, any>
) {
  if (!appInsights) return

  appInsights.trackException({
    exception: error,
    severityLevel,
    properties,
  })
}

/**
 * Track a page view
 */
export function trackPageView(
  name?: string,
  uri?: string,
  properties?: Record<string, any>
) {
  if (!appInsights) return

  appInsights.trackPageView({
    name,
    uri,
    properties,
  })
}

/**
 * Track a custom trace/log message
 */
export function trackTrace(
  message: string,
  severityLevel?: number,
  properties?: Record<string, any>
) {
  if (!appInsights) return

  appInsights.trackTrace({
    message,
    severityLevel,
    properties,
  })
}

/**
 * Set authenticated user context
 */
export function setUser(userId: string, accountId?: string) {
  if (!appInsights) return

  appInsights.setAuthenticatedUserContext(userId, accountId, true)
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUser() {
  if (!appInsights) return

  appInsights.clearAuthenticatedUserContext()
}

/**
 * Start tracking a dependency call (e.g., API request)
 */
export function trackDependency(
  id: string,
  method: string,
  absoluteUrl: string,
  command: string,
  duration: number,
  success: boolean,
  resultCode?: number
) {
  if (!appInsights) return

  appInsights.trackDependencyData({
    id,
    name: method,
    target: absoluteUrl,
    type: 'HTTP',
    duration,
    success,
    responseCode: resultCode,
    properties: {
      command,
    },
  })
}

/**
 * Flush all pending telemetry
 * Useful before page unload or app shutdown
 */
export function flush() {
  if (!appInsights) return

  appInsights.flush()
}

/**
 * Severity levels for Application Insights
 */
export const SeverityLevel = {
  Verbose: 0,
  Information: 1,
  Warning: 2,
  Error: 3,
  Critical: 4,
} as const

/**
 * Wrap an async function with error tracking
 */
export function withErrorTracking<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: {
    name?: string
    properties?: Record<string, any>
  }
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      trackException(error as Error, SeverityLevel.Error, {
        functionName: context?.name || fn.name,
        ...context?.properties,
        arguments: args,
      })
      throw error
    }
  }) as T
}
