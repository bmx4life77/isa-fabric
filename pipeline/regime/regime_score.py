def compute_regime_score(psi5_norm, sigma_norm, div_norm,
                         w_psi=0.5, w_sigma=0.3, w_div=0.2):
    return w_psi * psi5_norm + w_sigma * sigma_norm + w_div * div_norm
