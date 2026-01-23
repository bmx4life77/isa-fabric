// src/execution/types.ts
export type TaskId = string;

export interface ExecutionTask<T = any> {
  id: TaskId;
  // user-provided function that performs the task. It must be async.
  run: (ctx?: ExecutionContext) => Promise<T>;
  // ids of tasks this task depends on (must finish before this runs)
  dependsOn?: TaskId[];
  // optional "resource keys" that this task will read/write — used for conflict detection
  // e.g. ["account:0x123:balance", "storage:slot:42"]
  resourceKeys?: string[];
  // optional metadata used by NatSpec / ISA metrics
  meta?: Record<string, any>;
}

export interface ExecutionResult<T = any> {
  id: TaskId;
  ok: boolean;
  value?: T;
  error?: any;
  startedAt?: number;
  endedAt?: number;
}

export interface ExecutionContext {
  // expose read-only helpers inside task.run if required
  tick?: number;
  metrics?: {
    // hook for the fabric to record timings
    record: (id: TaskId, startedAt: number, endedAt: number) => void;
  };
}

export interface ReplayEvent {
  id: TaskId;
  // minimal data to reconstruct the task or lookup in TagBank / DB
  dependsOn?: TaskId[];
  resourceKeys?: string[];
  meta?: any;
}
