# Este archivo centraliza las listas de características para cada tipo de modelo.
# Es más limpio que tenerlas directamente en el código de la ruta.

# Diccionario que mapea el tipo de modelo a su lista de características
FEATURES_CONFIG = {
    "TOI": [
        "ra", "dec", "st_pmra", "st_pmdec", "pl_tranmid", "pl_orbper",
        "pl_trandurh", "pl_trandep", "pl_rade", "pl_insol", "pl_eqt",
        "st_tmag", "st_dist", "st_teff", "st_logg", "st_rad"
    ],
    "KOI": [
        "koi_score", "koi_fpflag_nt", "koi_fpflag_ss", "koi_fpflag_co",
        "koi_fpflag_ec", "koi_period", "koi_impact", "koi_duration",
        "koi_depth", "koi_prad", "koi_teq", "koi_insol", "koi_model_snr",
        "koi_steff", "koi_slogg", "koi_srad"
    ],
    "K2": [
        "pl_orbper", "pl_rade", "pl_radj", "sy_snum", "st_teff", "st_rad",
        "st_mass", "ra", "dec", "sy_dist", "sy_vmag", "sy_kmag", "sy_gaiamag"
    ]
}

# Diccionario que mapea el tipo de modelo a la ruta de su archivo .keras
MODELS_CONFIG = {
    "TOI": "https://modelos-spaceapps-nasa.onrender.com/v1/models/TOI_model:predict",
    "KOI": "https://modelos-spaceapps-nasa.onrender.com/v1/models/KOI_model:predict",
    #"KOI": "http://localhost:8501/v1/models/KOI_model:predict",
    "K2": "models/K2_model.keras"
}
