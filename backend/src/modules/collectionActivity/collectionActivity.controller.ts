import { Request, Response, NextFunction } from "express";
import collectionActivityService from "./collectionActivity.service";

class CollectionActivityController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const activity =
        await collectionActivityService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Collection activity created successfully.",
        data: activity,
      });
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
      const activity =
        await collectionActivityService.update(
          String(req.params.id),
          req.body
        );

      return res.status(200).json({
        success: true,
        message: "Collection activity updated successfully.",
        data: activity,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const activities =
        await collectionActivityService.findAll();

      return res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const activity =
        await collectionActivityService.findById(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByLoan(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const activities =
        await collectionActivityService.findByLoan(
          String(req.params.loanId)
        );

      return res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CollectionActivityController();