import { Router } from "express";
import { auditController } from "../controllers/audit.controller.js";

const router = Router();

router.get(
  "/",
  auditController.latest.bind(auditController)
);

export default router;