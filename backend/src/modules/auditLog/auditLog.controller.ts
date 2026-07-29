import { Request, Response, NextFunction } from "express";

import auditLogService from "./auditLog.service";

class AuditLogController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const auditLog = await auditLogService.create(
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Audit log created successfully.",
        data: auditLog,
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
      const logs = await auditLogService.findAll();

      return res.status(200).json({
        success: true,
        count: logs.length,
        data: logs,
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
      const log = await auditLogService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: log,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuditLogController();