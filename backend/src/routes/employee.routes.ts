import { Router } from "express";
import { employeeController } from "../controllers/employee.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/*
    Everyone who is logged in can view employees
*/

router.get(
    "/",
    authenticate,
    employeeController.getEmployees.bind(employeeController)
);

router.get(
    "/:id/profile",
    authenticate,
    employeeController.profile.bind(employeeController)
);

router.get(
    "/:id",
    authenticate,
    employeeController.getEmployee.bind(employeeController)
);

router.get(
    "/:id/details",
    authenticate,
    employeeController.getEmployeeDetails.bind(employeeController)
);

/*
    Only ADMIN can create/update/delete
*/

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    employeeController.createEmployee.bind(employeeController)
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    employeeController.updateEmployee.bind(employeeController)
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    employeeController.deleteEmployee.bind(employeeController)
);

export default router;