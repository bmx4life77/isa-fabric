export function blendTheta(
  shortTerm: number[],
  longTerm: number[],
  theta: number,
  horizonHours: number
): number {
  const lastShort = shortTerm[shortTerm.length - 1];
  const lastLong = longTerm[longTerm.length - 1];

  const blended = (1 - theta) * lastShort + theta * lastLong;

  const prevLong = longTerm[longTerm.length - 2] ?? lastLong;
  const slope = lastLong - prevLong;

  const forecast = blended + slope * (horizonHours / 24);

  return forecast;
}
