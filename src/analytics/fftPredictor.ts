// src/analytics/fftPredictor.ts

export function computeSpectralProfile(
  series: number[],
  bands: number = 8     // <-- new optional argument
) {
  const n = series.length;
  if (n < 2) {
    return {
      lowBandEnergy: 0,
      midBandEnergy: 0,
      highBandEnergy: 0,
      regularityScore: 0
    };
  }

  // Basic FFT substitute using simple DFT
  const re = new Array(n).fill(0);
  const im = new Array(n).fill(0);

  for (let k = 0; k < n; k++) {
    for (let t = 0; t < n; t++) {
      const angle = (-2 * Math.PI * k * t) / n;
      re[k] += series[t] * Math.cos(angle);
      im[k] += series[t] * Math.sin(angle);
    }
  }

  const mag = re.map((r, i) => Math.sqrt(r * r + im[i] * im[i]));

  const slice = Math.floor(n / bands);

  const lowBand = mag.slice(0, slice);
  const midBand = mag.slice(slice, slice * 2);
  const highBand = mag.slice(slice * 2);

  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

  const lowEnergy = sum(lowBand);
  const midEnergy = sum(midBand);
  const highEnergy = sum(highBand);

  return {
    lowBandEnergy: lowEnergy,
    midBandEnergy: midEnergy,
    highBandEnergy: highEnergy,
    regularityScore: lowEnergy / (lowEnergy + highEnergy || 1)
  };
}
