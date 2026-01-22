export function generateNarrative(insights: any, scores: any) {
  return {
    availability: narrativeForDimension("availability", insights.availability, scores.availability),
    performance: narrativeForDimension("performance", insights.performance, scores.performance),
    resilience: narrativeForDimension("resilience", insights.resilience, scores.resilience),
    security: narrativeForDimension("security", insights.security, scores.security),
    overall: overallNarrative(insights, scores)
  };
}

function narrativeForDimension(name: string, insight: any, score: number) {
  const parts: string[] = [];

  // Start with the balance statement
  parts.push(insight.balance);

  // Add a driver if present
  if (insight.drivers.length > 0) {
    parts.push(`Key positive factors included ${insight.drivers[0].toLowerCase()}.`);
  }

  // Add a stressor if present
  if (insight.stressors.length > 0) {
    parts.push(`Primary stressors involved ${insight.stressors[0].toLowerCase()}.`);
  }

  // Add trajectory
  parts.push(`Current trajectory is ${insight.trajectory.toLowerCase()}.`);

  return parts.join(" ");
}

function overallNarrative(insights: any, scores: any) {
  const strong: string[] = [];
  const strained: string[] = [];

  if (scores.availability > 0.7) strong.push("availability");
  else if (scores.availability < 0.5) strained.push("availability");

  if (scores.performance > 0.7) strong.push("performance");
  else if (scores.performance < 0.5) strained.push("performance");

  if (scores.resilience > 0.7) strong.push("resilience");
  else if (scores.resilience < 0.5) strained.push("resilience");

  if (scores.security > 0.7) strong.push("security");
  else if (scores.security < 0.5) strained.push("security");

  const parts: string[] = [];

  if (strong.length > 0) {
    parts.push(`The system demonstrated strong ${strong.join(", ")}.`);
  }

  if (strained.length > 0) {
    parts.push(`Areas showing strain included ${strained.join(", ")}.`);
  }

  if (parts.length === 0) {
    parts.push("The system maintained a balanced posture across all dimensions.");
  }

  return parts.join(" ");
}

