// src/worker/DAGAnalyzer.ts
/**
 * Minimal DAG helper utilities for dependency detection and grouping.
 * Tasks are nodes with ids and a list of dependent ids (edges).
 */
export interface TaskNode {
  id: string;
  dependsOn?: string[]; // list of predecessor ids
  meta?: any;
}

export class DAGAnalyzer {
  nodes: Map<string, TaskNode>;

  constructor(nodes: TaskNode[] = []) {
    this.nodes = new Map(nodes.map((n) => [n.id, n]));
  }

  add(node: TaskNode) {
    this.nodes.set(node.id, node);
  }

  // detect cycles (returns cycle path or null)
  detectCycle(): string[] | null {
    const temp = new Set<string>();
    const perm = new Set<string>();
    const path: string[] = [];

    const visit = (id: string): string[] | null => {
      if (perm.has(id)) return null;
      if (temp.has(id)) {
        // find loop slice
        const idx = path.indexOf(id);
        return path.slice(idx).concat(id);
      }
      temp.add(id);
      path.push(id);
      const node = this.nodes.get(id);
      for (const dep of node?.dependsOn ?? []) {
        const cycle = visit(dep);
        if (cycle) return cycle;
      }
      temp.delete(id);
      perm.add(id);
      path.pop();
      return null;
    };

    for (const id of this.nodes.keys()) {
      const cycle = visit(id);
      if (cycle) return cycle;
    }
    return null;
  }

  // topological sort (Kahn's algorithm) -> returns array of node ids in topo order
  topologicalSort(): string[] {
    const inDegree = new Map<string, number>();
    for (const [id] of this.nodes) inDegree.set(id, 0);
    for (const [, node] of this.nodes) {
      for (const dep of node.dependsOn ?? []) {
        inDegree.set(node.id, (inDegree.get(node.id) || 0));
        inDegree.set(dep, (inDegree.get(dep) || 0));
      }
    }
    // Actually compute in-degrees correctly
    inDegree.clear();
    for (const [id] of this.nodes) inDegree.set(id, 0);
    for (const [, node] of this.nodes) {
      for (const pred of node.dependsOn ?? []) {
        inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1);
      }
    }

    const queue: string[] = [];
    for (const [id, deg] of inDegree.entries()) {
      if (deg === 0) queue.push(id);
    }
    const result: string[] = [];
    while (queue.length) {
      const id = queue.shift()!;
      result.push(id);
      const node = this.nodes.get(id)!;
      // for all nodes that depend on this node, reduce indegree
      for (const [otherId, otherNode] of this.nodes) {
        if ((otherNode.dependsOn ?? []).includes(id)) {
          inDegree.set(otherId, (inDegree.get(otherId) || 0) - 1);
          if (inDegree.get(otherId) === 0) queue.push(otherId);
        }
      }
    }
    if (result.length !== this.nodes.size) {
      throw new Error('Graph has at least one cycle or unresolved dependency');
    }
    return result;
  }

  // identify parallelizable groups (levels) - returns array of groups (each group: array of node ids)
  identifyParallelGroups(): string[][] {
    // simple approach: repeatedly take nodes with no remaining dependencies
    const remaining = new Map<string, Set<string>>();
    for (const [id, node] of this.nodes) {
      remaining.set(id, new Set(node.dependsOn ?? []));
    }
    const groups: string[][] = [];
    while (remaining.size > 0) {
      const ready: string[] = [];
      for (const [id, deps] of remaining) {
        if (deps.size === 0) ready.push(id);
      }
      if (ready.length === 0) throw new Error('Cycle detected or unsatisfiable dependencies');
      groups.push(ready);
      // remove ready nodes
      for (const r of ready) {
        remaining.delete(r);
      }
      // remove references to ready nodes from others
      for (const [, deps] of remaining) {
        for (const r of ready) deps.delete(r);
      }
    }
    return groups;
  }
}
