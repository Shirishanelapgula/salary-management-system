import { Router } from "express";

import employeeRoutes from "./employee.routes.js";
import salaryRoutes from "./salary.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import aiRoutes from "./ai.routes.js";
import departmentRoutes from "./department.routes.js";
import countryRoutes from "./country.routes.js";
import geminiRoutes from "./gemini.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/employees", employeeRoutes);
router.use("/departments", departmentRoutes);
router.use("/employees", salaryRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/ai", aiRoutes);
router.use("/countries", countryRoutes);
router.use("/gemini", geminiRoutes);
router.use("/auth", authRoutes);
/*
|--------------------------------------------------------------------------
| Salary Management
|--------------------------------------------------------------------------
*/

router.use("/salaries", salaryRoutes);

/*
|--------------------------------------------------------------------------
| Employee Salary History
|--------------------------------------------------------------------------
*/

router.use("/employees", salaryRoutes);

export default router;