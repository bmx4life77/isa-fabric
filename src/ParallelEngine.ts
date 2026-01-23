// src/ParallelEngine.ts
import { WorkerPool, Task } from './worker/WorkerPool';
import { DAGAnalyzer, TaskNode } from './worker/DAGAnalyzer';

export interface ExecutionTask<T = any> {
  id: string;
  dependsOn?: string[];
  fn: () => Promise<T>;
  meta?: any;
}

export class ParallelEngine {
  private pool: WorkerPool;
  private analyzer: DAGAnalyzer;

  constructor(concurrency = Math.max(1, require('os').cpus().length - 1)) {
    this.pool = new WorkerPool(concurrency);
    this.analyzer = new DAGAnalyzer();
  }

  async run<T = any>(tasks: ExecutionTask<T>[]) : Promise<Record<string, T>> {
    // populate DAG
    for (const t of tasks) {
      this.analyzer.add({ id: t.id, dependsOn: t.dependsOn, meta: t.meta });
    }
    // detect cycle
    const cycle = this.analyzer.detectCycle();
    if (cycle) throw new Error('Cycle detected: ' + cycle.join(' -> '));

    const groups = this.analyzer.identifyParallelGroups();
    const results: Record<string, T> = {};

    for (const group of groups) {
      // dispatch all tasks in the group in parallel via worker pool
      const promises = group.map((id) => {
        const task = tasks.find((t) => t.id === id)!;
        return this.pool.run(async () => {
          const r = await task.fn();
          results[id] = r;
          return r;
        });
      });
      // Wait for the group to finish before next group
      await Promise.all(promises);
    }

    return results;
  }
}
