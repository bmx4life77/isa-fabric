// src/fre/events.ts

 export type FREEventType =
  | "fre:start"
  | "fre:loaded"
  | "fre:envelope"
  | "fre:diagnostics"
  | "fre:forecast"
  | "fre:shock"
  | "fre:done"
  | "fre:error";

export interface FREEvent<T = any> {
  type: FREEventType;
  ts: string;
  runId: string;
  payload?: T;
}

export function emitEvent<T>(evt: FREEvent<T>, enabled: boolean) {
  if (!enabled) return;
  process.stdout.write(JSON.stringify(evt) + "\n");
}

export function nowIso() {
  return new Date().toISOString();
}
