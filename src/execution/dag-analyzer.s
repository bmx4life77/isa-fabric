export interface ExecutionNode {
  id: string;
  deps: string[];
  job: () => Promise<any>;
}

export class DAG {
  private nodes = new Map<string, ExecutionNode>();

  addNode(node: ExecutionNode) {
    if (this.nodes.has(node.id)) throw new Error(`Duplicate node id: ${node.id}`);
    this.nodes.set(node.id, node);
  }

  topologicalSort(): ExecutionNode[][] {
    const indeg = new Map<string, number>();
    const batches: ExecutionNode[][] = [];

    this.nodes.forEach(n => indeg.set(n.id, 0));
    this.nodes.forEach(n => {
      n.deps.forEach(d => indeg.set(n.id, indeg.get(n.id)! + 1));
    });

    while (true) {
      const zero = [...indeg.entries()].filter(([_, v]) => v === 0).map(([k]) => k);
      if (zero.length === 0) break;

      const layer: ExecutionNode[] = zero.map(id => this.nodes.get(id)!);
      batches.push(layer);

      for (const id of zero) indeg.delete(id);
      this.nodes.forEach(n => {
        if (indeg.has(n.id) && n.deps.some(d => zero.includes(d))) {
          indeg.set(n.id, indeg.get(n.id)! - 1);
        }
      });
    }

    return batches;
  }
}
