import { Router } from "express";
import { salaryController } from "../controllers/salary.controller.js";

const router = Router();

/* ============================================
   Salary Management Routes
   /api/salaries
============================================ */

router.get(
  "/",
  salaryController.getAll.bind(salaryController)
);

router.get(
  "/:id",
  salaryController.getOne.bind(salaryController)
);

router.put(
  "/:id",
  salaryController.update.bind(salaryController)
);

router.delete(
  "/:id",
  salaryController.delete.bind(salaryController)
);

/* ============================================
   Employee Salary Routes
   /api/employees/:id/salary
============================================ */

router.get(
  "/:id/salary",
  salaryController.getCurrentSalary.bind(salaryController)
);

router.get(
  "/:id/salary/history",
  salaryController.getSalaryHistory.bind(salaryController)
);

router.post(
  "/:id/salary",
  salaryController.reviseSalary.bind(salaryController)
);

export default router;