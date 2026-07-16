import { auditRepository } from "../repositories/audit.repository.js";

export class AuditService {
  async log(
    action: string,
    entityType: string,
    entityId: string,
    description: string,
    userId?: number
  ) {
    const result = await auditRepository.create({
      action,
      entityType,
      entityId,
      description,
      userId,
    });

    return result;
  }

  async latest() {
    return auditRepository.getLatest();
  }
}

export const auditService = new AuditService();