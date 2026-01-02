def normalize_series(x, method="minmax"):
    if method == "zscore":
        return (x - x.mean()) / (x.std() + 1e-9)
    return (x - x.min()) / (x.max() - x.min() + 1e-9)
