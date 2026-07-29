import {
  NotificationStatus,
  NotificationType,
} from "@prisma/client";
import notificationRepository from "./notification.repository";

class NotificationService {
  async getAll() {
    return await notificationRepository.findAll();
  }

  async getMyNotifications(userId: string) {
    return await notificationRepository.findByUser(userId);
  }

  async create(data: {
    userId: string;
    type: NotificationType;
    subject?: string;
    message: string;
    status?: NotificationStatus;
    sentAt?: Date;
  }) {
    return await notificationRepository.create(data);
  }

  async markAsRead(id: string) {
    return await notificationRepository.markAsRead(id);
  }

  async delete(id: string) {
    return await notificationRepository.delete(id);
  }
}

export default new NotificationService();