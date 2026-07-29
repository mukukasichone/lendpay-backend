import { Prisma } from "@prisma/client";

import auditLogRepository from "./auditLog.repository";
import userRepository from "../user/user.repository";

import { NotFoundError } from "../../common/errors";

import {
  CreateAuditLogDto,
} from "./auditLog.validation";

class AuditLogService {
  async create(
    data: CreateAuditLogDto
  ) {
    if (data.userId) {
      const user = await userRepository.findById(
        data.userId
      );

      if (!user) {
        throw new NotFoundError(
          "User not found."
        );
      }
    }

    return auditLogRepository.create({
      entity: data.entity,

      entityId: data.entityId,

      action: data.action,

      oldValues:
        data.oldValues as Prisma.JsonObject,

      newValues:
        data.newValues as Prisma.JsonObject,

      ipAddress: data.ipAddress,

      userAgent: data.userAgent,

      user: data.userId
        ? {
            connect: {
              id: data.userId,
            },
          }
        : undefined,
    });
  }

  /**
   * Internal helper.
   * Business services should call this method.
   * Audit failures should never interrupt
   * the main business transaction.
   */
  async log(
  data: CreateAuditLogDto
) {
  try {
    return await this.create(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  async findAll() {
    return auditLogRepository.findAll();
  }

  async findById(id: string) {
    const auditLog =
      await auditLogRepository.findById(id);

    if (!auditLog) {
      throw new NotFoundError(
        "Audit log not found."
      );
    }

    return auditLog;
  }
}

export default new AuditLogService();