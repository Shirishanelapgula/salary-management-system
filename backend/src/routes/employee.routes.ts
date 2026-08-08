import { Router } from "express";
import { employeeController } from "../controllers/employee.controller.js";

const router = Router();

/*
    Everyone who is logged in can view employees
*/

router.get(
    "/",
    employeeController.getEmployees.bind(employeeController)
);

router.get(
    "/:id/profile",
    employeeController.profile.bind(employeeController)
);

router.get(
    "/:id",
    employeeController.getEmployee.bind(employeeController)
);

router.get(
    "/:id/details",
    employeeController.getEmployeeDetails.bind(employeeController)
);

/*
    Only ADMIN can create/update/delete
*/

router.post(
    "/",
    employeeController.createEmployee.bind(employeeController)
);

router.put(
    "/:id",
    employeeController.updateEmployee.bind(employeeController)
);

router.delete(
    "/:id",
    employeeController.deleteEmployee.bind(employeeController)
);

export default router;