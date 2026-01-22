import { writeDeployment, activateProfile, nextVersion } from "./registry";
import { DeployResult, DeployOptions } from "./types";

// -----------------------------------------------------
// Main entry point
// -----------------------------------------------------
export async function deployArtifact(
  artifact: any,
  options: DeployOptions
): Promise<DeployResult> {
  try {
    // 1. Normalize artifact
    const normalized = normalizeArtifact(artifact);

    // 2. Prepare metadata
    const metadata = prepareMetadata(options);

    // 3. Execute deployment
    const execution = await executeDeployment(normalized, metadata);

    // 4. Return structured result
    return {
      status: "ok",
      message: "Deployment completed successfully",
      details: {
        artifact: normalized,
        metadata,
        execution
      }
    };
  } catch (err: any) {
    return {
      status: "error",
      message: "Deployment failed",
      details: err.message
    };
  }
}

// -----------------------------------------------------
// Lifecycle Stages
// -----------------------------------------------------

function normalizeArtifact(artifact: any) {
  // Placeholder for future normalization logic
  return artifact;
}

function prepareMetadata(options: DeployOptions) {
  return {
    target: options.target ?? "local",
    dryRun: options.dryRun ?? false,
    version: options.version ?? null,
    timestamp: Date.now(),
    extra: options
  };
}

// -----------------------------------------------------
// Versioning Helpers
// -----------------------------------------------------

function detectBaseName(artifact: any): string {
  // Envelope: use metadata.source if present
  if (artifact?.metadata?.source) {
    return artifact.metadata.source;
  }

  // Profile: domain + subdomain
  if (artifact?.domain && artifact?.subdomain) {
    return `${artifact.domain}-${artifact.subdomain}`;
  }

  // Model: type-model
  if (artifact?.type) {
    return `${artifact.type}-model`;
  }

  // Fallback
  return "artifact";
}

// -----------------------------------------------------
// Deployment Execution
// -----------------------------------------------------

async function executeDeployment(artifact: any, metadata: any) {
  if (metadata.dryRun) {
    return {
      mode: "dry-run",
      message: "Validation only, no deployment executed"
    };
  }

  // Determine artifact type
  const type = detectArtifactType(artifact);

  // Determine versioned name
  const baseName = detectBaseName(artifact);
  const version = nextVersion(type, baseName);
  const name = `${baseName}-v${version}`;

  // Write to local registry
  const filePath = writeDeployment(type, name, {
    artifact,
    metadata,
    version
  });

  // Handle profile activation
  if (type === "profiles" && metadata.extra?.activate) {
    activateProfile(name);
  }

  return {
    mode: "local",
    message: `Artifact deployed locally to ${filePath}`,
    path: filePath
  };
}

// -----------------------------------------------------
// Artifact Type Detection
// -----------------------------------------------------

function detectArtifactType(artifact: any): string {
  if (artifact?.metrics) return "envelopes";
  if (artifact?.weights) return "profiles";
  if (artifact?.policy) return "models";
  return "artifacts";
}
