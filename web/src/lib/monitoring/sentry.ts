/**
 * Sentry Error Tracking Configuration
 *
 * Centralized error tracking and monitoring using Sentry.io
 * Captures errors, performance metrics, and user context.
 *
 * Setup:
 * 1. Sign up at https://sentry.io (Free tier: 5K events/month)
 * 2. Create project and get DSN
 * 3. Add NEXT_PUBLIC_SENTRY_DSN to .env.local
 * 4. Call initSentry() in your root layout
 */

import * as Sentry from '@sentry/nextjs'

/**
 * Initialize Sentry for error tracking
 * Call this in your root layout or _app file
 */
export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN

  if (!dsn) {
    console.warn('[Sentry] DSN not configured, error tracking disabled')
    return
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session replay for debugging user issues
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Performance monitoring
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Filter out sensitive data
    beforeSend(event, hint) {
      // Remove sensitive data from event
      if (event.request) {
        // Remove authorization headers
        if (event.request.headers) {
          delete event.request.headers['authorization']
          delete event.request.headers['cookie']
        }

        // Remove sensitive query parameters
        if (event.request.query_string) {
          const sanitized = event.request.query_string.replace(
            /token=[^&]*/gi,
            'token=[REDACTED]'
          )
          event.request.query_string = sanitized
        }
      }

      // Remove sensitive context data
      if (event.contexts) {
        if (event.contexts.stripe) {
          delete event.contexts.stripe.secretKey
        }
      }

      return event
    },

    // Ignore common non-critical errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'atomicFindClose',

      // Network errors that are expected
      'NetworkError',
      'Network request failed',
      'Failed to fetch',

      // User cancelled actions
      'AbortError',
      'The user aborted a request',
    ],

    // Only track important breadcrumbs
    beforeBreadcrumb(breadcrumb, hint) {
      // Don't track console logs in production
      if (breadcrumb.category === 'console' && process.env.NODE_ENV === 'production') {
        return null
      }

      // Don't track XHR to tracking services
      if (breadcrumb.category === 'xhr' && breadcrumb.data?.url) {
        const url = breadcrumb.data.url
        if (url.includes('analytics') || url.includes('tracking')) {
          return null
        }
      }

      return breadcrumb
    },
  })
}

/**
 * Capture an error with additional context
 */
export function captureError(
  error: Error,
  context?: {
    user?: { id: string; email?: string; username?: string }
    tags?: Record<string, string>
    extra?: Record<string, any>
    level?: Sentry.SeverityLevel
  }
) {
  if (context) {
    Sentry.withScope((scope) => {
      if (context.user) {
        scope.setUser(context.user)
      }
      if (context.tags) {
        Object.entries(context.tags).forEach(([key, value]) => {
          scope.setTag(key, value)
        })
      }
      if (context.extra) {
        Object.entries(context.extra).forEach(([key, value]) => {
          scope.setExtra(key, value)
        })
      }
      if (context.level) {
        scope.setLevel(context.level)
      }
      Sentry.captureException(error)
    })
  } else {
    Sentry.captureException(error)
  }
}

/**
 * Capture a message (for non-error events)
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info',
  context?: {
    tags?: Record<string, string>
    extra?: Record<string, any>
  }
) {
  if (context) {
    Sentry.withScope((scope) => {
      if (context.tags) {
        Object.entries(context.tags).forEach(([key, value]) => {
          scope.setTag(key, value)
        })
      }
      if (context.extra) {
        Object.entries(context.extra).forEach(([key, value]) => {
          scope.setExtra(key, value)
        })
      }
      scope.setLevel(level)
      Sentry.captureMessage(message)
    })
  } else {
    Sentry.captureMessage(message, level)
  }
}

/**
 * Set user context for error tracking
 */
export function setUser(user: {
  id: string
  email?: string
  username?: string
  [key: string]: any
}) {
  Sentry.setUser(user)
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUser() {
  Sentry.setUser(null)
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
    timestamp: Date.now() / 1000,
  })
}

/**
 * Start a transaction for performance monitoring
 */
export function startTransaction(name: string, op: string) {
  return Sentry.startTransaction({
    name,
    op,
  })
}

/**
 * Wrap an async function with error tracking
 */
export function withErrorTracking<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: {
    tags?: Record<string, string>
    name?: string
  }
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      captureError(error as Error, {
        tags: context?.tags,
        extra: {
          functionName: context?.name || fn.name,
          arguments: args,
        },
      })
      throw error
    }
  }) as T
}
