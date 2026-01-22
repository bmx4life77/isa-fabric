export interface DeployResult {
  status: "ok" | "error";
  message: string;
  details?: any;
}

export interface DeployOptions {
  target?: string;
  dryRun?: boolean;
  metadata?: string;
  type?: string;
  version?: string;
  shadow?: boolean;
}
