import { NextFunction, Request, Response } from "express";
import userService from "./user.service";

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();

      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(req.params.id as string);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(
        req.params.id as string,
        req.body
      );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.deactivate(
        req.user!.id,
        req.params.id as string
      );

      res.status(200).json({
        success: true,
        message: "User deactivated successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.activate(
        req.params.id as string
      );

      res.status(200).json({
        success: true,
        message: "User activated successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.delete(
        req.user!.id,
        req.params.id as string
      );

      res.status(200).json({
        success: true,
        message: "User deleted successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();