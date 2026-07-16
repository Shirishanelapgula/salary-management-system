import { Router } from "express";
import { geminiController } from "../controllers/gemini.controller.js";

const router = Router();

router.get(
  "/test",
  geminiController.test.bind(geminiController)
);

export default router;