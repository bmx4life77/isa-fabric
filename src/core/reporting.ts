// src/core/reporting.ts

export function generateReport(scores: any) {
  return {
    summary: {
      overall: scores.overall,
      availability: scores.availability,
      performance: scores.performance,
      resilience: scores.resilience,
      security: scores.security
    },
    timestamp: Date.now(),
    version: "1.0.0"
  };
}
