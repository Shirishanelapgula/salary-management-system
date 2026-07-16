import { Router } from "express";
import { auditController } from "../controllers/audit.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  auditController.latest.bind(auditController)
);

export default router;