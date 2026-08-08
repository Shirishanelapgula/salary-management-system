import { Router } from "express";
import { countryController } from "../controllers/country.controller.js";

const router = Router();

router.get(
  "/",
  countryController.getAll.bind(
    countryController
  )
);

router.get(
  "/:id",
  countryController.getById.bind(
    countryController
  )
);

router.post(
  "/",
  countryController.create.bind(
    countryController
  )
);

router.put(
  "/:id",
  countryController.update.bind(
    countryController
  )
);

router.delete(
  "/:id",
  countryController.delete.bind(
    countryController
  )
);

export default router;