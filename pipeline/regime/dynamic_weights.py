def select_weights(regime_label):
    if regime_label == "baseline":
        return dict(VI=0.30, MI=0.25, CRI=0.25, CBI=0.20)
    if regime_label == "stressed":
        return dict(VI=0.40, MI=0.15, CRI=0.30, CBI=0.15)
    return dict(VI=0.35, MI=0.20, CRI=0.25, CBI=0.20)
