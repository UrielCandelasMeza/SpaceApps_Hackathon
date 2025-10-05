import streamifier from "streamifier";
import csv from "csv-parser";
import { Readable } from "stream";
import type { KOI, TOI, K2 } from "../../types";
import { Models } from "../../types";

function processCsv<T>(fileBuffer: Buffer) {
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
