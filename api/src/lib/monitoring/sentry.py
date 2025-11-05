"""
Sentry Error Tracking Configuration - Backend

Centralized error tracking and monitoring for FastAPI backend using Sentry.io
Captures errors, performance metrics, and request context.

Setup:
1. Sign up at https://sentry.io (Free tier: 5K events/month)
2. Create project and get DSN
3. Add SENTRY_DSN to .env.local
4. Call init_sentry() at application startup
5. Install: pip install sentry-sdk[fastapi]
"""

import os
from typing import Any, Dict, Optional

import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.starlette import StarletteIntegration
from sentry_sdk.integrations.sqlalchemy import SqlAlchemyIntegration


def init_sentry() -> None:
    """
    Initialize Sentry for error tracking.

    Call this at application startup (e.g., in main.py).
    """
    dsn = os.getenv("SENTRY_DSN")

    if not dsn:
        print("[Sentry] DSN not configured, error tracking disabled")
        return

    environment = os.getenv("SENTRY_ENVIRONMENT", os.getenv("NODE_ENV", "development"))

    sentry_sdk.init(
        dsn=dsn,
        environment=environment,
        # Sample rates
        traces_sample_rate=0.1 if environment == "production" else 1.0,
        profiles_sample_rate=0.1 if environment == "production" else 1.0,

        # Integrations
        integrations=[
            FastApiIntegration(
                transaction_style="endpoint",  # Group by endpoint not URL
            ),
            StarletteIntegration(
                transaction_style="endpoint",
            ),
            SqlAlchemyIntegration(),
        ],

        # Filter sensitive data
        before_send=before_send_filter,

        # Ignore breadcrumbs callback
        before_breadcrumb=before_breadcrumb_filter,
    )


def before_send_filter(event: Dict[str, Any], hint: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Filter sensitive data before sending to Sentry.

    Args:
        event: Sentry event dict
        hint: Additional context

    Returns:
        Filtered event or None to drop
    """
    # Remove sensitive request data
    if "request" in event:
        request = event["request"]

        # Remove authorization headers
        if "headers" in request:
            headers = request["headers"]
            headers.pop("authorization", None)
            headers.pop("cookie", None)
            headers.pop("x-api-key", None)

        # Sanitize query string
        if "query_string" in request:
            query = request["query_string"]
            if query:
                # Remove token parameters
                sanitized = query.replace("token=", "token=[REDACTED]")
                sanitized = sanitized.replace("api_key=", "api_key=[REDACTED]")
                request["query_string"] = sanitized

    # Remove sensitive extra data
    if "extra" in event:
        extra = event["extra"]
        # Remove password fields
        for key in list(extra.keys()):
            if "password" in key.lower() or "secret" in key.lower():
                extra[key] = "[REDACTED]"

    # Remove sensitive context
    if "contexts" in event:
        contexts = event["contexts"]

        # Sanitize database context
        if "database" in contexts:
            db = contexts["database"]
            if "connection_string" in db:
                db["connection_string"] = "[REDACTED]"

        # Sanitize Stripe/payment context
        if "stripe" in contexts:
            stripe = contexts["stripe"]
            stripe.pop("secret_key", None)
            stripe.pop("api_key", None)

    return event


def before_breadcrumb_filter(crumb: Dict[str, Any], hint: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Filter breadcrumbs before adding to Sentry.

    Args:
        crumb: Breadcrumb dict
        hint: Additional context

    Returns:
        Filtered breadcrumb or None to drop
    """
    # Don't track database query breadcrumbs (too noisy)
    if crumb.get("category") == "query":
        return None

    # Don't track HTTP requests to analytics/tracking services
    if crumb.get("category") == "httplib":
        url = crumb.get("data", {}).get("url", "")
        if any(x in url for x in ["analytics", "tracking", "segment", "mixpanel"]):
            return None

    return crumb


def capture_error(
    error: Exception,
    context: Optional[Dict[str, Any]] = None,
    user: Optional[Dict[str, str]] = None,
    tags: Optional[Dict[str, str]] = None,
    extra: Optional[Dict[str, Any]] = None,
    level: str = "error"
) -> None:
    """
    Capture an error with additional context.

    Args:
        error: The exception to capture
        context: Additional context dict
        user: User information (id, email, username)
        tags: Tags for filtering/grouping
        extra: Extra data for debugging
        level: Severity level (debug, info, warning, error, fatal)
    """
    with sentry_sdk.push_scope() as scope:
        if user:
            scope.set_user(user)

        if tags:
            for key, value in tags.items():
                scope.set_tag(key, value)

        if extra:
            for key, value in extra.items():
                scope.set_extra(key, value)

        if context:
            scope.set_context("custom", context)

        scope.set_level(level)
        sentry_sdk.capture_exception(error)


def capture_message(
    message: str,
    level: str = "info",
    tags: Optional[Dict[str, str]] = None,
    extra: Optional[Dict[str, Any]] = None,
) -> None:
    """
    Capture a message (for non-error events).

    Args:
        message: Message to capture
        level: Severity level
        tags: Tags for filtering/grouping
        extra: Extra data
    """
    with sentry_sdk.push_scope() as scope:
        if tags:
            for key, value in tags.items():
                scope.set_tag(key, value)

        if extra:
            for key, value in extra.items():
                scope.set_extra(key, value)

        scope.set_level(level)
        sentry_sdk.capture_message(message)


def set_user(user_id: str, email: Optional[str] = None, username: Optional[str] = None) -> None:
    """
    Set user context for error tracking.

    Args:
        user_id: User ID
        email: User email (optional)
        username: Username (optional)
    """
    sentry_sdk.set_user({
        "id": user_id,
        "email": email,
        "username": username,
    })


def clear_user() -> None:
    """Clear user context (e.g., on logout)."""
    sentry_sdk.set_user(None)


def add_breadcrumb(message: str, category: str, data: Optional[Dict[str, Any]] = None, level: str = "info") -> None:
    """
    Add a breadcrumb for debugging.

    Args:
        message: Breadcrumb message
        category: Category for grouping
        data: Additional data
        level: Severity level
    """
    sentry_sdk.add_breadcrumb(
        message=message,
        category=category,
        data=data or {},
        level=level,
    )


def start_transaction(name: str, op: str) -> Any:
    """
    Start a transaction for performance monitoring.

    Args:
        name: Transaction name
        op: Operation type (e.g., "http.server", "db.query")

    Returns:
        Transaction object
    """
    return sentry_sdk.start_transaction(name=name, op=op)
