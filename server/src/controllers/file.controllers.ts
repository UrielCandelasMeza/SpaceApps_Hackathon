import type { Request, Response } from "express";
import { processFile, prepareData } from "../lib/parseFile";
import type { KOI, TOI, K2 } from "../../types.d";
import { Models } from "../../types.d";
import * as tf from "@tensorflow/tfjs-node";

export const manageData = async (req: Request, res: Response) => {
  const { type } = req.params;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: "No se ha subido ningún archivo CSV.",
    });
  }
  const file = req.file;

  if (
    file.mimetype !== "text/csv" &&
    file.originalname.split(".").pop() !== "csv"
  ) {
    return res.status(400).json({
      success: false,
      error: "El archivo no es un CSV válido.",
    });
  }

  let processedFile: any;
  const features: string[] = [];
  try {
    if (type == Models.KOI) {
      processedFile = processFile<KOI>(file.buffer);
      features.push(
        "koi_score",
        "koi_fpflag_nt",
        "koi_fpflag_ss",
        "koi_fpflag_co",
        "koi_fpflag_ec",
        "koi_period",
        "koi_impact",
        "koi_duration",
        "koi_depth",
        "koi_prad",
        "koi_teq",
        "koi_insol",
        "koi_model_snr",
        "koi_steff",
        "koi_slogg",
        "koi_srad",
      );
    }
    if (type == Models.TOI) {
      processedFile = processFile<TOI>(file.buffer);
      features.push(
        "ra",
        "dec",
        "st_pmra",
        "st_pmdec",
        "pl_tranmid",
        "pl_orbper",
        "pl_trandurh",
        "pl_trandep",
        "pl_rade",
        "pl_insol",
        "pl_eqt",
        "st_tmag",
        "st_dist",
        "st_teff",
        "st_logg",
        "st_rad",
      );
    }
    if (type == Models.K2) {
      processedFile = processFile<K2>(file.buffer);
      features.push(
        "disposition",
        "pl_orbper",
        "pl_rade",
        "pl_radj",
        "sy_snum",
        "st_teff",
        "st_rad",
        "st_mass",
        "ra",
        "dec",
        "sy_dist",
        "sy_vmag",
        "sy_kmag",
        "sy_gaiamag",
      );
    }
    const X_tensors = prepareData(processedFile, features);
    const model = await tf.loadLayersModel(
      `http://localhost:8000/${type}_Model/model.json`,
    );

    const predictions = model.predict(X_tensors) as tf.Tensor;
    const predictionsArray = await predictions.array();

    X_tensors.dispose();
    predictions.dispose();

    console.log("Predicciones:", predictionsArray);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en el procesamiento del archivo:", error.message);
      return res.status(500).json({
        success: false,
        error: `Error interno al procesar el archivo: ${error.message}`,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Error desconocido al procesar el archivo.",
    });
  }
};

