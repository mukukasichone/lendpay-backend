import { Request, Response } from "express";
import notificationService from "./notification.service";

class NotificationController {
  async getAll(req: Request, res: Response) {
    const data = await notificationService.getAll();

    return res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully.",
      data,
    });
  }

  async getMine(req: Request, res: Response) {
    const data = await notificationService.getMyNotifications(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: "My notifications retrieved successfully.",
      data,
    });
  }

  async markAsRead(req: Request, res: Response) {
    const data = await notificationService.markAsRead(
      String(req.params.id)
    );

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data,
    });
  }

  async delete(req: Request, res: Response) {
    await notificationService.delete(
      String(req.params.id)
    );

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  }
}

export default new NotificationController();