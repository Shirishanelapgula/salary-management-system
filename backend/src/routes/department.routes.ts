import { Router } from "express";
import { departmentController } from "../controllers/department.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  departmentController.getAll.bind(
    departmentController
  )
);

router.get(
  "/:id",
  authenticate,
  departmentController.getById.bind(
    departmentController
  )
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  departmentController.create.bind(
    departmentController
  )
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  departmentController.update.bind(
    departmentController
  )
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  departmentController.delete.bind(
    departmentController
  )
);

export default router;