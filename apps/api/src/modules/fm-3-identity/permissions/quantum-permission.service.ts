import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class QuantumPermissionService {
  private readonly logger = new Logger(QuantumPermissionService.name);
}
