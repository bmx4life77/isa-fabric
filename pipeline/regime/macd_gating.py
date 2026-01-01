def compute_volatility_score(sigma_current, sigma_low, sigma_high):
    return max(0.0, min(2.0, (sigma_current - sigma_low) /
                        (sigma_high - sigma_low + 1e-9)))

def effective_macd_weight(base_weight, vol_score_V):
    factor = max(0.0, 1.0 - vol_score_V)
    return base_weight * factor
