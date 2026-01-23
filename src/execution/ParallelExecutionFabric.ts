// src/execution/ParallelExecutionFabric.ts
import { WorkerPool } from "./workerPool";

export interface ExecutionTask {
  id?: string;
  run(): Promise<any>;
  dependsOn?: string[]; // optional dependency ids
}

export class ParallelExecutionFabric {
  private pool: WorkerPool;

  constructor(concurrency?: number) {
    this.pool = new WorkerPool(concurrency);
  }

  // Very small DAG / topological naive executor: groups tasks without dependencies first.
  async runTasks(tasks: ExecutionTask[], concurrency?: number) {
    const results: Record<string, any> = {};
    const remaining = new Map(tasks.map(t => [t.id ?? crypto.randomUUID(), t]));
    const dependents = new Map<string, Set<string>>();

    // build inverse deps
    for (const t of tasks) {
      const id = t.id!;
      (t.dependsOn || []).forEach(d => {
        if (!dependents.has(d)) dependents.set(d, new Set());
        dependents.get(d)!.add(id);
      });
    }

    // naive loop: pick runnable tasks (no unmet deps)
    while (remaining.size > 0) {
      const runnable: ExecutionTask[] = [];
      for (const [id, t] of remaining.entries()) {
        const deps = t.dependsOn || [];
        const unmet = deps.some(d => remaining.has(d));
        if (!unmet) runnable.push(t);
      }

      if (runnable.length === 0) {
        // cycle or unresolved dependency -> throw
        throw new Error("Dependency cycle or missing dependency detected in tasks");
      }

      // dispatch all runnable in parallel with pool
      await Promise.all(
        runnable.map(t =>
          this.pool.execute(async () => {
            const id = t.id!;
            const res = await t.run();
            results[id] = res;
            remaining.delete(id);
            return res;
          })
        )
      );
    }

    return results;
  }
}
