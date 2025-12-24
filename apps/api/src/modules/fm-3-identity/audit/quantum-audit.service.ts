import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class QuantumAuditService {
  private readonly logger = new Logger(QuantumAuditService.name);
}
