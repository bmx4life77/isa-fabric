from pipeline.regime.normalize import normalize_series
from pipeline.regime.regime_score import compute_regime_score
from pipeline.regime.regime_classification import classify_regime

psi5_norm = normalize_series(psi5_series)
sigma_norm = normalize_series(sigma_series)
div_norm = normalize_series(divergence_series)

R = compute_regime_score(psi5_norm[i], sigma_norm[i], div_norm[i])
regime_label = classify_regime(R)

record["regime_score_R"] = float(R)
record["regime_label"] = regime_label
