import { auditRepository } from "../repositories/audit.repository.js";

export class AuditService {
  async log(
    action: string,
    entityType: string,
    entityId: string,
    description: string,
    userId?: number
  ) {
    try {
      return await auditRepository.create({
        action,
        entityType,
        entityId,
        description,
        userId,
      });
    } catch (err) {
      console.error("Audit failed:", err);
      return null;
    }
  }

  async latest() {
    return auditRepository.getLatest();
  }
}

export const auditService = new AuditService();