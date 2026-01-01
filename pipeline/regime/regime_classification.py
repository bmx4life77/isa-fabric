def classify_regime(R, r_low=0.3, r_high=0.7):
    if R <= r_low:
        return "baseline"
    if R >= r_high:
        return "stressed"
    return "transitional"
