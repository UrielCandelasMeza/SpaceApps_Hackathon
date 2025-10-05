import type { Request, Response } from "express";

export const manageData = (req: Request, res: Response) => {
  const { type } = req.params;
  if (!req.file) {
    return res.status(400).json({ error: "There is no csv file" });
  }

  const file = req.file;
  try {
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: `Error: ${error.message}` });
    }
    return res.status(500).json({ error: "Unknown error" });
  }
};
