// src/core/TagBank.ts
export type TagDef = {
  name: string;
  category: string;
  description: string;
  isaLink?: string;
  method?: string;
};

export const TagBank: Record<string, TagDef> = {
  "@custom:parallel": {
    name: "@custom:parallel",
    category: "execution",
    description: "Marks a function as safe for optimistic parallel execution",
    isaLink: "vectorizationUtilization",
    method: "validateParallelSafety"
  },
  "@security:reentrantGuard": {
    name: "@security:reentrantGuard",
    category: "security",
    description: "Ensures reentrancy guard is applied to the function",
    isaLink: "securityDimensionPsi5",
    method: "checkReentrancyDefense"
  },
  "@custom:isolated": {
    name: "@custom:isolated",
    category: "state",
    description: "Function executes in isolated storage context for safety",
    isaLink: "securityDimensionPsi5",
    method: "assertIsolation"
  }
};

export function listTags() {
  return Object.values(TagBank);
}
