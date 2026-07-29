import { Request, Response } from "express";
import dashboardService from "./dashboard.service";

class DashboardController {
  async getSummary(req: Request, res: Response) {
    const data = await dashboardService.getSummary();

    return res.status(200).json({
      success: true,
      message: "Dashboard summary retrieved successfully.",
      data,
    });
  }
}

export default new DashboardController();