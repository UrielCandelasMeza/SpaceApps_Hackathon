import type { Request, Response } from "express";

export const c1 = (_req: Request, res: Response) => {
  try {
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: `Error: ${error.message}` });
    }
    return res.status(500).json({ error: "Unknown Error" });
  }
};
