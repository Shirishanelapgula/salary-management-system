import { Router } from "express";

import employeeRoutes from "./employee.routes.js";
import salaryRoutes from "./salary.routes.js";

const router = Router();

router.use("/employees", employeeRoutes);
router.use("/employees", salaryRoutes);

export default router;