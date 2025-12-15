import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.permission.findMany({
        include: {
          roles: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch permissions', (error as Error).stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const permission = await this.prisma.permission.findUnique({
        where: { id },
        include: {
          roles: true,
        },
      });

      if (!permission) {
        throw new NotFoundException(`Permission with ID ${id} not found`);
      }

      return permission;
    } catch (error) {
      this.logger.error(`Failed to fetch permission ${id}`, (error as Error).stack);
      throw error;
    }
  }
}
