import { Router } from "express";
import { countryController } from "../controllers/country.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  countryController.getAll.bind(
    countryController
  )
);

router.get(
  "/:id",
  authenticate,
  countryController.getById.bind(
    countryController
  )
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  countryController.create.bind(
    countryController
  )
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  countryController.update.bind(
    countryController
  )
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  countryController.delete.bind(
    countryController
  )
);

export default router;