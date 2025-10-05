export enum Models {
  KOI,
  TOI,
  K2,
}

export interface KOI {
  koi_score: number;
  koi_fpflag_nt: number;
  koi_fpflag_ss: number;
  koi_fpflag_co: number;
  koi_fpflag_ec: number;
  koi_period: number;
  koi_impact: number;
  koi_duration: number;
  koi_depth: number;
  koi_prad: number;
  koi_teq: number;
  koi_insol: number;
  koi_model_snr: number;
  koi_steff: number;
  koi_slogg: number;
  koi_srad: number;
}

export interface TOI {
  ra: number;
  dec: number;
  st_pmra: number;
  st_pmdec: number;
  pl_tranmid: number;
  pl_orbper: number;
  pl_trandurh: number;
  pl_trandep: number;
  pl_rade: number;
  pl_insol: number;
  pl_eqt: number;
  st_tmag: number;
  st_dist: number;
  st_teff: number;
  st_logg: number;
  st_rad: number;
}

export interface K2 {
  disposition: number;
  pl_orbper: number;
  pl_rade: number;
  pl_radj: number;
  sy_snum: number;
  st_teff: number;
  st_rad: number;
  st_mass: number;
  ra: number;
  dec: number;
  sy_dist: number;
  sy_vmag: number;
  sy_kmag: number;
  sy_gaiamag: number;
}
