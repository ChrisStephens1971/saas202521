import { validateProvisionPayload, validateRollbackPayload } from "../src/lib/validation";

describe("Payload Validation", () => {
  describe("validateProvisionPayload", () => {
    it("should validate a correct provision payload", () => {
      const payload = {
        firstName: "John",
        lastName: "Doe",
        jobTitle: "Software Engineer",
        department: "Engineering",
        manager: "jane.smith@example.com"
      };

      const result = validateProvisionPayload(payload);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject payload missing required fields", () => {
      const payload = {
        firstName: "John"
        // Missing lastName, jobTitle, department
      };

      const result = validateProvisionPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("lastName is required and must be a string");
      expect(result.errors).toContain("jobTitle is required and must be a string");
      expect(result.errors).toContain("department is required and must be a string");
    });

    it("should reject invalid name characters", () => {
      const payload = {
        firstName: "John123",
        lastName: "Doe@#$",
        jobTitle: "Engineer",
        department: "IT"
      };

      const result = validateProvisionPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("firstName contains invalid characters");
      expect(result.errors).toContain("lastName contains invalid characters");
    });

    it("should accept names with hyphens and apostrophes", () => {
      const payload = {
        firstName: "Mary-Jane",
        lastName: "O'Brien",
        jobTitle: "Manager",
        department: "HR"
      };

      const result = validateProvisionPayload(payload);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject non-string field types", () => {
      const payload = {
        firstName: 123,
        lastName: true,
        jobTitle: null,
        department: undefined
      };

      const result = validateProvisionPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe("validateRollbackPayload", () => {
    it("should validate a correct rollback payload", () => {
      const payload = {
        upn: "john.doe@example.com",
        groups: ["group-id-1", "group-id-2"],
        siteId: "site-id-123",
        correlationId: "abc-123-def-456"
      };

      const result = validateRollbackPayload(payload);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should validate rollback payload with only UPN", () => {
      const payload = {
        upn: "john.doe@example.com"
      };

      const result = validateRollbackPayload(payload);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject missing UPN", () => {
      const payload = {
        groups: ["group-1"],
        siteId: "site-123"
      };

      const result = validateRollbackPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("upn is required and must be a string");
    });

    it("should reject invalid UPN format", () => {
      const payload = {
        upn: "not-an-email"
      };

      const result = validateRollbackPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("upn must be a valid email address");
    });

    it("should reject invalid groups type", () => {
      const payload = {
        upn: "john.doe@example.com",
        groups: "not-an-array"
      };

      const result = validateRollbackPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("groups must be an array");
    });

    it("should reject invalid siteId type", () => {
      const payload = {
        upn: "john.doe@example.com",
        siteId: 123
      };

      const result = validateRollbackPayload(payload);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("siteId must be a string");
    });
  });
});
