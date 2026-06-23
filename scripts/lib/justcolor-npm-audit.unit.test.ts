import { describe, expect, it } from "vitest";
import {
  auditExceedsThreshold,
  auditExceedsThresholdOutsideAllowlist,
  DEV_TOOLCHAIN_HIGH_ALLOWLIST,
  formatAuditFailure,
  listPackagesAtOrAboveSeverity,
  parseNpmAuditJson,
} from "./justcolor-npm-audit.mjs";

describe("parseNpmAuditJson", () => {
  it("parses valid npm audit JSON", () => {
    const report = parseNpmAuditJson(
      JSON.stringify({
        metadata: { vulnerabilities: { high: 0, critical: 0 } },
      }),
    );

    expect(report.metadata?.vulnerabilities?.high).toBe(0);
  });

  it("throws on empty output", () => {
    expect(() => parseNpmAuditJson("")).toThrow(/empty/i);
  });

  it("throws on malformed JSON", () => {
    expect(() => parseNpmAuditJson("{not-json")).toThrow(
      /Failed to parse npm audit JSON/i,
    );
  });
});

describe("auditExceedsThreshold", () => {
  it("returns true when high vulnerabilities are present", () => {
    const report = {
      metadata: { vulnerabilities: { high: 2, critical: 0 } },
    };

    expect(auditExceedsThreshold(report, "high")).toBe(true);
  });

  it("returns true when critical vulnerabilities are present", () => {
    const report = {
      metadata: { vulnerabilities: { high: 0, critical: 1 } },
    };

    expect(auditExceedsThreshold(report, "high")).toBe(true);
  });

  it("returns false for a clean report at high threshold", () => {
    const report = {
      metadata: {
        vulnerabilities: { low: 1, moderate: 0, high: 0, critical: 0 },
      },
    };

    expect(auditExceedsThreshold(report, "high")).toBe(false);
  });
});

describe("auditExceedsThresholdOutsideAllowlist", () => {
  it("ignores allowlisted dev-toolchain highs", () => {
    const report = {
      metadata: { vulnerabilities: { high: 1, critical: 0 } },
      vulnerabilities: {
        vite: { severity: "high" },
      },
    };

    expect(
      auditExceedsThresholdOutsideAllowlist(
        report,
        "high",
        DEV_TOOLCHAIN_HIGH_ALLOWLIST,
      ),
    ).toBe(false);
  });

  it("flags non-allowlisted highs", () => {
    const report = {
      metadata: { vulnerabilities: { high: 1, critical: 0 } },
      vulnerabilities: {
        "set-value": { severity: "high" },
      },
    };

    expect(
      auditExceedsThresholdOutsideAllowlist(
        report,
        "high",
        DEV_TOOLCHAIN_HIGH_ALLOWLIST,
      ),
    ).toBe(true);
    expect(listPackagesAtOrAboveSeverity(report, "high")).toEqual([
      "set-value",
    ]);
  });
});

describe("formatAuditFailure", () => {
  it("returns null when audit is clean at threshold", () => {
    const report = {
      metadata: { vulnerabilities: { high: 0, critical: 0 } },
    };

    expect(formatAuditFailure(report, "high")).toBeNull();
  });

  it("returns a readable message when threshold is exceeded", () => {
    const report = {
      metadata: { vulnerabilities: { high: 3, critical: 1 } },
    };

    expect(formatAuditFailure(report, "high")).toMatch(/high: 3/);
    expect(formatAuditFailure(report, "high")).toMatch(/critical: 1/);
  });
});
