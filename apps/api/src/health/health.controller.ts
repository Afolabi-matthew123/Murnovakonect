import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async checkHealth() {
    try {
      // Test database connection
      const schoolCount = await this.prisma.school.count();
      
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        schools: schoolCount,
        message: 'Murnova Konect API is running successfully'
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error.message
      };
    }
  }
}
