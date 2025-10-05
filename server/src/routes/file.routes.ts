import { Router } from "express";
import multer from "multer";

import { manageData } from "../controllers/file.controllers";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/csv/:type", upload.single("csvFile"), manageData);

export default router;
