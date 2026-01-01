// src/adversarial/DivergenceDetector.ts

export interface CanonicalState {
  txId: string;
  success: boolean;
  gasUsed: number;
  reads: number;
  writes: number;
  committed: boolean;
  shard?: number;            // some engines use shard, some do not
  vectorizable?: boolean;    // optional
}

export interface EngineOutput {
  engine: string;            // e.g. "isa-fabric", "solana-style"
  results: CanonicalState[]; // one entry per transaction
}

export interface DivergenceReport {
  ok: boolean;
  mismatches: {
    txId: string;
    field: string;
    values: Record<string, any>; // engine → value
  }[];
  summary: string;
}

/**
 * Compare multiple engines' outputs and detect divergences.
 */
export class DivergenceDetector {
  detect(outputs: EngineOutput[]): DivergenceReport {
    const mismatches: DivergenceReport["mismatches"] = [];

    if (outputs.length < 2) {
      return {
        ok: true,
        mismatches: [],
        summary: "Only one engine provided — no divergence possible."
      };
    }

    // Assume all engines return the same tx ordering
    const baseline = outputs[0];

    for (let i = 0; i < baseline.results.length; i++) {
      const txId = baseline.results[i].txId;

      // Compare each field across all engines
      const fields = Object.keys(baseline.results[i]) as (keyof CanonicalState)[];

      for (const field of fields) {
        const values: Record<string, any> = {};
        let first: any = undefined;
        let diverged = false;

        for (const out of outputs) {
          const val = out.results[i][field];
          values[out.engine] = val;

          if (first === undefined) {
            first = val;
          } else if (val !== first) {
            diverged = true;
          }
        }

        if (diverged) {
          mismatches.push({
            txId,
            field,
            values
          });
        }
      }
    }

    return {
      ok: mismatches.length === 0,
      mismatches,
      summary: mismatches.length === 0
        ? "All engines produced identical results."
        : `${mismatches.length} divergences detected across engines.`
    };
  }
}
