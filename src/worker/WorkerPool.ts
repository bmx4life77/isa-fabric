// src/worker/WorkerPool.ts
export type Task<T> = () => Promise<T>;

export class WorkerPool {
  private concurrency: number;
  private active = 0;
  private queue: Array<{
    fn: Task<any>;
    resolve: (v: any) => void;
    reject: (e: any) => void;
  }> = [];

  constructor(concurrency = Math.max(1, require('os').cpus().length - 1)) {
    this.concurrency = concurrency;
  }

  run<T>(fn: Task<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.dequeue();
    });
  }

  private dequeue() {
    while (this.active < this.concurrency && this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.active++;
      item
        .fn()
        .then((v) => {
          this.active--;
          item.resolve(v);
          this.dequeue();
        })
        .catch((e) => {
          this.active--;
          item.reject(e);
          this.dequeue();
        });
    }
  }

  size() {
    return this.queue.length + this.active;
  }
}
