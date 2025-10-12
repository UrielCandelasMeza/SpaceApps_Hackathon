import streamifier from "streamifier";
import csv from "csv-parser";
import * as tf from "@tensorflow/tfjs-node";
import { Readable } from "stream";

interface StringIndexable {
  [key: string]: string;
}

export async function processFile<T>(fileBuffer: Buffer) {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    const readableStream: Readable = streamifier.createReadStream(fileBuffer);

    readableStream
      .pipe(csv())
      .on("data", (data: any) => {
        results.push(data as T);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export function prepareData<T extends StringIndexable>(
  data: T[],
  features: (keyof T)[],
): tf.Tensor3D {
  const tensorData = data.map((item: T) => {
    return features.map((feature) => parseFloat(item[feature]));
  });

  // Crea el tensor 2D
  const X_tensor = tf.tensor2d(tensorData);

  // Reshapes the 2D tensor to the 3D shape required by the Conv1D layer
  // La forma resultante será [número_de_ejemplos, número_de_características, 1]
  const reshaped_X_tensor = X_tensor.reshape([data.length, features.length, 1]);

  return reshaped_X_tensor as tf.Tensor3D;
}
