import { Router } from "express";
import { c1 } from "../controllers/history.contollers";

const router = Router();

router.get("/Foo", c1);

export default router;
