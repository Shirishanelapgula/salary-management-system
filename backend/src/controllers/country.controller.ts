import {
  Request,
  Response,
  NextFunction,
} from "express";

import { countryService } from "../services/country.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class CountryController {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await countryService.getCountries();

      return ApiResponse.success(
        res,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await countryService.getCountry(
          Number(req.params.id)
        );

      return ApiResponse.success(
        res,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await countryService.createCountry(
          req.body
        );

      return ApiResponse.success(
        res,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await countryService.updateCountry(
          Number(req.params.id),
          req.body
        );

      return ApiResponse.success(
        res,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await countryService.deleteCountry(
          Number(req.params.id)
        );

      return ApiResponse.success(
        res,
        data
      );
    } catch (error) {
      next(error);
    }
  }
}

export const countryController =
  new CountryController();