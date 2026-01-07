import { ParallelEngine } from "../src/ParallelEngine";

async function main() {
  const engine = new ParallelEngine(4);

  const tasks = [
    { id: "A", dependsOn: [], fn: async () => { await sleep(200); return "A"; } },
    { id: "B", dependsOn: ["A"], fn: async () => { await sleep(100); return "B"; } },
    { id: "C", dependsOn: ["A"], fn: async () => { await sleep(100); return "C"; } },
    { id: "D", dependsOn: ["B","C"], fn: async () => { await sleep(50); return "D"; } },
  ];
  const res = await engine.run(tasks as any);
  console.log(res);
}

function sleep(ms: number){ return new Promise(r=>setTimeout(r, ms)); }

main().catch(e=>console.error(e));
