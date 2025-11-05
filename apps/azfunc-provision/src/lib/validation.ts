/**
 * Payload validation utilities
 */

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate provision payload
 */
export function validateProvisionPayload(payload: any): ValidationResult {
  const errors: string[] = [];

  // Required fields
  if (!payload.firstName || typeof payload.firstName !== "string") {
    errors.push("firstName is required and must be a string");
  }

  if (!payload.lastName || typeof payload.lastName !== "string") {
    errors.push("lastName is required and must be a string");
  }

  if (!payload.jobTitle || typeof payload.jobTitle !== "string") {
    errors.push("jobTitle is required and must be a string");
  }

  if (!payload.department || typeof payload.department !== "string") {
    errors.push("department is required and must be a string");
  }

  // Optional fields validation
  if (payload.manager && typeof payload.manager !== "string") {
    errors.push("manager must be a string");
  }

  // Validate name format (no special characters except hyphens and apostrophes)
  const nameRegex = /^[a-zA-Z\-']+$/;
  if (payload.firstName && !nameRegex.test(payload.firstName)) {
    errors.push("firstName contains invalid characters");
  }

  if (payload.lastName && !nameRegex.test(payload.lastName)) {
    errors.push("lastName contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate rollback payload
 */
export function validateRollbackPayload(payload: any): ValidationResult {
  const errors: string[] = [];

  // Required fields
  if (!payload.upn || typeof payload.upn !== "string") {
    errors.push("upn is required and must be a string");
  }

  // Validate UPN format (basic email validation)
  if (payload.upn) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.upn)) {
      errors.push("upn must be a valid email address");
    }
  }

  // Optional fields validation
  if (payload.groups && !Array.isArray(payload.groups)) {
    errors.push("groups must be an array");
  }

  if (payload.siteId && typeof payload.siteId !== "string") {
    errors.push("siteId must be a string");
  }

  if (payload.correlationId && typeof payload.correlationId !== "string") {
    errors.push("correlationId must be a string");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
