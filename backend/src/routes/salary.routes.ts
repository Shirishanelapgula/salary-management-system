import { Router } from "express";
import { salaryController } from "../controllers/salary.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* ============================================
   Salary Management Routes
   /api/salaries
============================================ */

router.get(
  "/",
  authenticate,
  salaryController.getAll.bind(salaryController)
);

router.get(
  "/:id",
  authenticate,
  salaryController.getOne.bind(salaryController)
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  salaryController.update.bind(salaryController)
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  salaryController.delete.bind(salaryController)
);

/* ============================================
   Employee Salary Routes
   /api/employees/:id/salary
============================================ */

router.get(
  "/:id/salary",
  authenticate,
  salaryController.getCurrentSalary.bind(salaryController)
);

router.get(
  "/:id/salary/history",
  authenticate,
  salaryController.getSalaryHistory.bind(salaryController)
);

router.post(
  "/:id/salary",
  authenticate,
  authorize("ADMIN"),
  salaryController.reviseSalary.bind(salaryController)
);

export default router;