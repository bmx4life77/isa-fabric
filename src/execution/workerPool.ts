// src/execution/workerPool.ts
export interface WorkerTask<T = unknown, R = unknown> {
  id?: string;
  work: () => Promise<R> | R;
  meta?: T;
}

export class WorkerPool {
  private concurrency: number;
  private active = 0;
  private queue: WorkerTask[] = [];

  constructor(concurrency = Math.max(1, Math.floor(require('os').cpus().length / 2))) {
    this.concurrency = concurrency;
  }

  async execute<R = unknown>(task: WorkerTask<any, R> | (() => Promise<R> | R)): Promise<R> {
    const workTask = typeof task === 'function' ? { work: task } : task;

    return new Promise<R>((resolve, reject) => {
      const run = async () => {
        this.active++;
        try {
          const result = await Promise.resolve(workTask.work());
          resolve(result as R);
        } catch (err) {
          reject(err);
        } finally {
          this.active--;
          this.dequeue();
        }
      };

      this.queue.push({ ...workTask, work: run });
      // try to start immediately if there is capacity
      this.dequeue();
    });
  }

  private dequeue() {
    while (this.active < this.concurrency && this.queue.length > 0) {
      const t = this.queue.shift();
      if (!t) break;
      // the task.work we pushed wraps running + resolve
      // call it (it returns a promise)
      // but it's wrapped already in a function that resolves/rejects
      try {
        (t.work as any)();
      } catch (err) {
        // swallow; individual promises handle rejection
      }
    }
  }

  size() {
    return this.queue.length;
  }
}
