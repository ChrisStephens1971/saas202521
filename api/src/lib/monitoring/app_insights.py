"""
Azure Application Insights Configuration - Backend

Centralized monitoring for FastAPI backend using Azure Application Insights.
Captures errors, performance metrics, and request context.

Setup:
1. Create Application Insights resource in Azure Portal
2. Get Connection String
3. Add APPLICATIONINSIGHTS_CONNECTION_STRING to .env.local
4. Call init_app_insights() at application startup
5. Install: pip install opencensus-ext-azure opencensus-ext-flask

Azure Portal: https://portal.azure.com
Pricing: 5GB/month free, then ~$2.30/GB
"""

import logging
import os
from typing import Any, Dict, Optional

from opencensus.ext.azure import metrics_exporter
from opencensus.ext.azure.log_exporter import AzureLogHandler
from opencensus.ext.azure.trace_exporter import AzureExporter
from opencensus.stats import aggregation as aggregation_module
from opencensus.stats import measure as measure_module
from opencensus.stats import stats as stats_module
from opencensus.stats import view as view_module
from opencensus.tags import tag_map as tag_map_module
from opencensus.trace import config_integration
from opencensus.trace.samplers import ProbabilitySampler
from opencensus.trace.tracer import Tracer

# Global instances
_tracer: Optional[Tracer] = None
_metrics_exporter: Optional[metrics_exporter.MetricsExporter] = None
_logger: Optional[logging.Logger] = None


def init_app_insights() -> None:
    """
    Initialize Azure Application Insights for monitoring.

    Call this at application startup (e.g., in main.py).
    """
    global _tracer, _metrics_exporter, _logger

    connection_string = os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING")

    if not connection_string:
        print("[App Insights] Connection string not configured, monitoring disabled")
        return

    environment = os.getenv("APPINSIGHTS_ENVIRONMENT", os.getenv("NODE_ENV", "development"))

    try:
        # Configure integrations (automatically instrument libraries)
        config_integration.trace_integrations(['requests', 'sqlalchemy', 'postgresql'])

        # Set up trace exporter
        sampling_rate = 0.1 if environment == "production" else 1.0
        exporter = AzureExporter(connection_string=connection_string)
        sampler = ProbabilitySampler(rate=sampling_rate)

        _tracer = Tracer(exporter=exporter, sampler=sampler)

        # Set up metrics exporter
        _metrics_exporter = metrics_exporter.new_metrics_exporter(
            connection_string=connection_string
        )

        # Set up logging
        _logger = logging.getLogger(__name__)
        _logger.addHandler(
            AzureLogHandler(connection_string=connection_string)
        )
        _logger.setLevel(logging.INFO)

        print(f"[App Insights] Initialized successfully (environment: {environment})")

    except Exception as e:
        print(f"[App Insights] Failed to initialize: {e}")


def get_tracer() -> Optional[Tracer]:
    """Get the Application Insights tracer instance."""
    return _tracer


def get_logger() -> Optional[logging.Logger]:
    """Get the Application Insights logger instance."""
    return _logger


def track_event(
    name: str,
    properties: Optional[Dict[str, Any]] = None,
    measurements: Optional[Dict[str, float]] = None
) -> None:
    """
    Track a custom event.

    Args:
        name: Event name
        properties: Custom properties (string key-value pairs)
        measurements: Custom measurements (numeric key-value pairs)
    """
    if not _logger:
        return

    extra = {
        'custom_dimensions': {
            'event_name': name,
            **(properties or {}),
            **(measurements or {})
        }
    }

    _logger.info(f"Event: {name}", extra=extra)


def track_metric(
    name: str,
    value: float,
    properties: Optional[Dict[str, str]] = None
) -> None:
    """
    Track a custom metric.

    Args:
        name: Metric name
        value: Metric value
        properties: Custom properties for filtering
    """
    if not _metrics_exporter:
        return

    stats = stats_module.stats
    view_manager = stats.view_manager

    # Create measure
    measure = measure_module.MeasureFloat(name, name, "unit")

    # Create view
    view = view_module.View(
        name,
        name,
        [],
        measure,
        aggregation_module.LastValueAggregation()
    )

    # Register view
    view_manager.register_view(view)

    # Record measurement
    mmap = stats.stats_recorder.new_measurement_map()
    tmap = tag_map_module.TagMap()

    if properties:
        for key, value in properties.items():
            tmap.insert(key, value)

    mmap.measure_float_put(measure, value)
    mmap.record(tmap)


def track_exception(
    error: Exception,
    severity: str = "ERROR",
    properties: Optional[Dict[str, Any]] = None
) -> None:
    """
    Track an exception.

    Args:
        error: The exception to track
        severity: Severity level (ERROR, WARNING, CRITICAL)
        properties: Additional context properties
    """
    if not _logger:
        return

    extra = {
        'custom_dimensions': {
            'exception_type': type(error).__name__,
            'exception_message': str(error),
            **(properties or {})
        }
    }

    if severity == "CRITICAL":
        _logger.critical(str(error), exc_info=error, extra=extra)
    elif severity == "WARNING":
        _logger.warning(str(error), exc_info=error, extra=extra)
    else:
        _logger.error(str(error), exc_info=error, extra=extra)


def track_trace(
    message: str,
    severity: str = "INFO",
    properties: Optional[Dict[str, Any]] = None
) -> None:
    """
    Track a trace message.

    Args:
        message: The message to log
        severity: Severity level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
        properties: Additional context properties
    """
    if not _logger:
        return

    extra = {
        'custom_dimensions': properties or {}
    }

    if severity == "DEBUG":
        _logger.debug(message, extra=extra)
    elif severity == "WARNING":
        _logger.warning(message, extra=extra)
    elif severity == "ERROR":
        _logger.error(message, extra=extra)
    elif severity == "CRITICAL":
        _logger.critical(message, extra=extra)
    else:
        _logger.info(message, extra=extra)


def track_request(
    name: str,
    url: str,
    duration: float,
    response_code: int,
    success: bool,
    properties: Optional[Dict[str, Any]] = None
) -> None:
    """
    Track an HTTP request.

    Args:
        name: Request name (e.g., "GET /api/users")
        url: Request URL
        duration: Duration in milliseconds
        response_code: HTTP response code
        success: Whether request was successful
        properties: Additional context properties
    """
    if not _logger:
        return

    extra = {
        'custom_dimensions': {
            'request_name': name,
            'url': url,
            'duration_ms': duration,
            'response_code': response_code,
            'success': success,
            **(properties or {})
        }
    }

    _logger.info(f"Request: {name}", extra=extra)


def track_dependency(
    name: str,
    dependency_type: str,
    target: str,
    duration: float,
    success: bool,
    result_code: Optional[int] = None,
    properties: Optional[Dict[str, Any]] = None
) -> None:
    """
    Track a dependency call (e.g., database, external API).

    Args:
        name: Dependency name
        dependency_type: Type (e.g., "SQL", "HTTP", "Redis")
        target: Target server/endpoint
        duration: Duration in milliseconds
        success: Whether call was successful
        result_code: Result/status code
        properties: Additional context properties
    """
    if not _logger:
        return

    extra = {
        'custom_dimensions': {
            'dependency_name': name,
            'dependency_type': dependency_type,
            'target': target,
            'duration_ms': duration,
            'success': success,
            'result_code': result_code,
            **(properties or {})
        }
    }

    _logger.info(f"Dependency: {name}", extra=extra)


def set_user(user_id: str, account_id: Optional[str] = None) -> None:
    """
    Set user context for tracking.

    Args:
        user_id: User ID
        account_id: Account/tenant ID (optional)
    """
    # OpenCensus doesn't have direct user context setting
    # Instead, add user_id to all subsequent events via properties
    if _tracer:
        span = _tracer.current_span()
        if span:
            span.add_attribute("user_id", user_id)
            if account_id:
                span.add_attribute("account_id", account_id)


def clear_user() -> None:
    """Clear user context (e.g., on logout)."""
    # OpenCensus handles this per-span, no global clear needed
    pass


def start_span(name: str) -> Any:
    """
    Start a new span for distributed tracing.

    Args:
        name: Span name

    Returns:
        Span context manager
    """
    if not _tracer:
        # Return a no-op context manager
        class NoOpSpan:
            def __enter__(self):
                return self
            def __exit__(self, *args):
                pass

        return NoOpSpan()

    return _tracer.span(name=name)


def flush() -> None:
    """Flush all pending telemetry."""
    if _tracer:
        _tracer.exporter.export(_tracer.exporter.queue)

    if _metrics_exporter:
        _metrics_exporter.export_metrics(_metrics_exporter.queue)


# FastAPI middleware integration
def get_fastapi_middleware():
    """
    Get FastAPI middleware for automatic request tracking.

    Usage:
        from fastapi import FastAPI
        from lib.monitoring.app_insights import get_fastapi_middleware

        app = FastAPI()
        app.middleware("http")(get_fastapi_middleware())
    """
    async def app_insights_middleware(request, call_next):
        import time

        start_time = time.time()

        try:
            response = await call_next(request)
            duration = (time.time() - start_time) * 1000  # Convert to ms

            track_request(
                name=f"{request.method} {request.url.path}",
                url=str(request.url),
                duration=duration,
                response_code=response.status_code,
                success=response.status_code < 400,
                properties={
                    "method": request.method,
                    "path": request.url.path,
                }
            )

            return response

        except Exception as e:
            duration = (time.time() - start_time) * 1000
            track_exception(e, severity="ERROR", properties={
                "method": request.method,
                "path": request.url.path,
            })
            raise

    return app_insights_middleware
