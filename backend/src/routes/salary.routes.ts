import { Router } from "express";
import { salaryController } from "../controllers/salary.controller.js";

const router = Router();

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