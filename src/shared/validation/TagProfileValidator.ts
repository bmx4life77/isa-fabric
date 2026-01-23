// src/shared/validation/TagProfileValidator.ts

export type TagSet = {
  security?: Record<string, any>;
  concurrency?: Record<string, any>;
  metrics?: Record<string, any>;
  raw?: Record<string, any>;
};

export interface ValidationResult {
  ok: boolean;
  missing: string[];
  conflicts: string[];
}

export class TagProfileValidator {
  validate(tags: TagSet = {}): ValidationResult {
    const missing: string[] = [];
    const conflicts: string[] = [];

    // ===============================
    // SECURITY RULES
    // ===============================

    const sec = tags.security || {};

    // Example: reentrancy rule
    if (sec.reentrancy && !["none", "check-effects", "guarded"].includes(sec.reentrancy)) {
      conflicts.push(`invalid reentrancy mode: ${sec.reentrancy}`);
    }

    // Access control example
    if (sec.access && typeof sec.access !== "string") {
      conflicts.push("access tag must be string");
    }


    // ===============================
    // CONCURRENCY RULES
    // ===============================

    const conc = tags.concurrency || {};

    // Example conflict: parallel + full-lock cannot coexist
    if (conc.parallel === true && conc.lockStrategy === "full") {
      conflicts.push("parallel=true conflicts with lockStrategy=full");
    }

    // Example: conflict if maxRetries < 0
    if (conc.maxRetries !== undefined && conc.maxRetries < 0) {
      conflicts.push("maxRetries cannot be negative");
    }


    // ===============================
    // RAW TAG RULES
    // ===============================

    const raw = tags.raw || {};
    // If raw contains @parallel and @sequential at the same time
    if (raw.parallel && raw.sequential) {
      conflicts.push("raw.parallel vs raw.sequential");
    }


    // ===============================
    // REQUIRED TAG RULES (OPTIONAL)
    // ===============================

    // Example: security-critical methods MUST declare access control
    if (sec.critical === true && !sec.access) {
      missing.push("security.access (required for critical functions)");
    }


    return {
      ok: missing.length === 0 && conflicts.length === 0,
      missing,
      conflicts
    };
  }
}
