import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/summary", dashboardController.summary.bind(dashboardController));

router.get("/highest-paid", dashboardController.highestPaid.bind(dashboardController));

router.get("/lowest-paid", dashboardController.lowestPaid.bind(dashboardController));

router.get("/salary-by-department", dashboardController.salaryByDepartment.bind(dashboardController));

router.get("/country-stats", dashboardController.countryStats.bind(dashboardController));

export default router;