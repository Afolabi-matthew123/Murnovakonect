import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return this.prisma.user.findMany({
        include: {
          school: true,
          roles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Failed to fetch users', (error as Error).stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          school: true,
          roles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          school: true,
          roles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      this.logger.error(`Failed to fetch user by email ${email}`, (error as Error).stack);
      throw error;
    }
  }

  async update(id: string, updateData: any) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: updateData,
        include: {
          school: true,
          roles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update user ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}`, (error as Error).stack);
      throw error;
    }
  }

  async findById(id: string) {
    return this.findOne(id);
  }
}
