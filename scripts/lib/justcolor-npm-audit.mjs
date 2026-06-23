import { execSync } from "node:child_process";

/** @typedef {'low' | 'moderate' | 'high' | 'critical'} AuditLevel */

/** @typedef {{ metadata?: { vulnerabilities?: Partial<Record<AuditLevel, number>> } }} NpmAuditReport */

/** Dev-only packages where remaining high advisories require a Svelte 5 / Vite 6 migration. */
export const DEV_TOOLCHAIN_HIGH_ALLOWLIST = new Set([
  "vite",
  "esbuild",
  "vite-node",
  "vitefu",
  "@sveltejs/vite-plugin-svelte",
  "@sveltejs/vite-plugin-svelte-inspector",
  "svelte-hmr",
]);

const LEVEL_ORDER = /** @type {const} */ ([
  "low",
  "moderate",
  "high",
  "critical",
]);

/**
 * @param {string} stdout
 * @returns {NpmAuditReport}
 */
export function parseNpmAuditJson(stdout) {
  const trimmed = stdout.trim();
  if (trimmed.length === 0) {
    throw new Error("npm audit output was empty");
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("npm audit output was not a JSON object");
    }
    return /** @type {NpmAuditReport} */ (parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse npm audit JSON: ${message}`);
  }
}

/**
 * @param {NpmAuditReport} report
 * @param {AuditLevel} level
 * @returns {boolean}
 */
export function auditExceedsThreshold(report, level) {
  const vulnerabilities = report.metadata?.vulnerabilities ?? {};
  const thresholdIndex = LEVEL_ORDER.indexOf(level);

  for (let index = thresholdIndex; index < LEVEL_ORDER.length; index += 1) {
    const severity = LEVEL_ORDER[index];
    const count = vulnerabilities[severity] ?? 0;
    if (count > 0) {
      return true;
    }
  }

  return false;
}

/**
 * @param {NpmAuditReport} report
 * @param {AuditLevel} level
 * @returns {string[]}
 */
export function listPackagesAtOrAboveSeverity(report, level) {
  const vulnerabilities =
    /** @type {Record<string, { severity?: AuditLevel }>} */ (
      report.vulnerabilities ?? {}
    );
  const thresholdIndex = LEVEL_ORDER.indexOf(level);

  return Object.entries(vulnerabilities)
    .filter(([, entry]) => {
      const severity = entry.severity ?? "low";
      return LEVEL_ORDER.indexOf(severity) >= thresholdIndex;
    })
    .map(([packageName]) => packageName);
}

/**
 * @param {NpmAuditReport} report
 * @param {AuditLevel} level
 * @param {Set<string>} allowlist
 * @returns {boolean}
 */
export function auditExceedsThresholdOutsideAllowlist(
  report,
  level,
  allowlist,
) {
  const offenders = listPackagesAtOrAboveSeverity(report, level).filter(
    (packageName) => !allowlist.has(packageName),
  );
  return offenders.length > 0;
}

/**
 * @param {NpmAuditReport} report
 * @param {AuditLevel} level
 * @returns {string | null}
 */
export function formatAuditFailure(report, level) {
  if (!auditExceedsThreshold(report, level)) {
    return null;
  }

  const vulnerabilities = report.metadata?.vulnerabilities ?? {};
  const parts = LEVEL_ORDER.filter(
    (severity) => (vulnerabilities[severity] ?? 0) > 0,
  ).map((severity) => `${severity}: ${vulnerabilities[severity]}`);

  return `npm audit found vulnerabilities at or above "${level}" (${parts.join(", ")})`;
}

/**
 * @param {string} cwd
 * @param {string} npmArgs
 * @returns {string}
 */
function runNpmAuditJson(cwd, npmArgs) {
  try {
    return execSync(`npm audit ${npmArgs} --json`, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    const execError =
      /** @type {NodeJS.ErrnoException & { stdout?: string }} */ (error);
    const stdout = execError.stdout ?? "";
    if (stdout.trim().length === 0) {
      throw error;
    }
    return stdout;
  }
}

/**
 * @param {string} cwd
 * @param {AuditLevel} [level='high']
 */
export function assertJustcolorNpmAuditClean(cwd, level = "high") {
  const productionReport = parseNpmAuditJson(
    runNpmAuditJson(cwd, `--omit=dev --audit-level=${level}`),
  );
  const productionFailure = formatAuditFailure(productionReport, level);
  if (productionFailure) {
    throw new Error(`${productionFailure} in production dependencies`);
  }

  const fullReport = parseNpmAuditJson(
    runNpmAuditJson(cwd, `--audit-level=critical`),
  );
  const criticalFailure = formatAuditFailure(fullReport, "critical");
  if (criticalFailure) {
    throw new Error(criticalFailure);
  }

  const devReport = parseNpmAuditJson(
    runNpmAuditJson(cwd, `--audit-level=${level}`),
  );
  if (
    auditExceedsThresholdOutsideAllowlist(
      devReport,
      level,
      DEV_TOOLCHAIN_HIGH_ALLOWLIST,
    )
  ) {
    const offenders = listPackagesAtOrAboveSeverity(devReport, level).filter(
      (packageName) => !DEV_TOOLCHAIN_HIGH_ALLOWLIST.has(packageName),
    );
    throw new Error(
      `npm audit found high+ vulnerabilities outside the dev-toolchain allowlist: ${offenders.join(", ")}`,
    );
  }
}
