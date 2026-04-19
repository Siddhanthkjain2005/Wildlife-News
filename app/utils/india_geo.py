STATE_CENTROIDS: dict[str, tuple[float, float]] = {
    "andhra pradesh": (15.9129, 79.74),
    "arunachal pradesh": (28.218, 94.7278),
    "assam": (26.2006, 92.9376),
    "bihar": (25.0961, 85.3131),
    "chhattisgarh": (21.2787, 81.8661),
    "goa": (15.2993, 74.124),
    "gujarat": (22.2587, 71.1924),
    "haryana": (29.0588, 76.0856),
    "himachal pradesh": (31.1048, 77.1734),
    "jharkhand": (23.6102, 85.2799),
    "karnataka": (15.3173, 75.7139),
    "kerala": (10.8505, 76.2711),
    "madhya pradesh": (22.9734, 78.6569),
    "maharashtra": (19.7515, 75.7139),
    "manipur": (24.6637, 93.9063),
    "meghalaya": (25.467, 91.3662),
    "mizoram": (23.1645, 92.9376),
    "nagaland": (26.1584, 94.5624),
    "odisha": (20.9517, 85.0985),
    "punjab": (31.1471, 75.3412),
    "rajasthan": (27.0238, 74.2179),
    "sikkim": (27.533, 88.5122),
    "tamil nadu": (11.1271, 78.6569),
    "telangana": (18.1124, 79.0193),
    "tripura": (23.9408, 91.9882),
    "uttar pradesh": (26.8467, 80.9462),
    "uttarakhand": (30.0668, 79.0193),
    "west bengal": (22.9868, 87.855),
    "andaman and nicobar islands": (11.7401, 92.6586),
    "chandigarh": (30.7333, 76.7794),
    "dadra and nagar haveli and daman and diu": (20.4283, 72.8397),
    "delhi": (28.7041, 77.1025),
    "jammu and kashmir": (33.7782, 76.5762),
    "ladakh": (34.2268, 77.5619),
    "lakshadweep": (10.5667, 72.6417),
    "puducherry": (11.9416, 79.8083),
}

INDIA_CENTER = (22.5937, 78.9629)


def centroid_for_state(state: str) -> tuple[float, float]:
    key = (state or "").strip().lower()
    return STATE_CENTROIDS.get(key, INDIA_CENTER)
