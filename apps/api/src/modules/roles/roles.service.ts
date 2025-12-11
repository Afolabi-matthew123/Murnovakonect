import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.role.findMany({
        include: {
          permissions: true,
          userRoles: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch roles', (error as Error).stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id },
        include: {
          permissions: true,
          userRoles: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!role) {
        throw new NotFoundException(`Role with ID ${id} not found`);
      }

      return role;
    } catch (error) {
      this.logger.error(`Failed to fetch role ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async addPermission(roleId: string, permissionId: string) {
    try {
      return await this.prisma.role.update({
        where: { id: roleId },
        data: {
          permissions: {
            connect: { id: permissionId },
          },
        },
        include: {
          permissions: true,
          userRoles: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to add permission to role ${roleId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async removePermission(roleId: string, permissionId: string) {
    try {
      return await this.prisma.role.update({
        where: { id: roleId },
        data: {
          permissions: {
            disconnect: { id: permissionId },
          },
        },
        include: {
          permissions: true,
          userRoles: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to remove permission from role ${roleId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }
}
