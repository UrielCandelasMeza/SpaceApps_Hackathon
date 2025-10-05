import streamifier from "streamifier";
import csv from "csv-parser";
import * as tf from "@tensorflow/tfjs-node";
import { Readable } from "stream";

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

export function prepareData<T>(data: T[], features: string[]) {
  const featureData = data.map((item) =>
    features.map((feat) => {
      const value = item[feat as keyof T];
      return value as unknown as number;
    }),
  );

  const X_tensor = tf.tensor2d(featureData);

  // const min = X_tensor.min();
  // const max = X_tensor.max();
  // const normalized_X = X_tensor.sub(min).div(max.sub(min));

  return X_tensor;
}
