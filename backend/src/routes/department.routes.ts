import { Router } from "express";
import { departmentController } from "../controllers/department.controller.js";

const router = Router();

router.get(
  "/",
  departmentController.getAll.bind(
    departmentController
  )
);

router.get(
  "/:id",
  departmentController.getById.bind(
    departmentController
  )
);

router.post(
  "/",
  departmentController.create.bind(
    departmentController
  )
);

router.put(
  "/:id",
  departmentController.update.bind(
    departmentController
  )
);

router.delete(
  "/:id",
  departmentController.delete.bind(
    departmentController
  )
);

export default router;