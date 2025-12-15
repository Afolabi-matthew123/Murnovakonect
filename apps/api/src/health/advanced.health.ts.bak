import { Injectable } from '@nestjs/common';
import { 
  HealthCheckError, 
  HealthIndicator, 
  HealthIndicatorResult 
} from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdvancedHealthIndicator extends HealthIndicator {
  constructor(private prisma: PrismaService) {
    super();
  }

  async isDatabaseHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Test database connection and basic query
      await this.prisma.$queryRaw`SELECT 1`;
      
      // Check database size and performance metrics
      const dbStats = await this.prisma.$queryRaw`
        SELECT 
          count(*) as table_count,
          pg_database_size(current_database()) as db_size
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `;

      return this.getStatus(key, true, {
        status: 'healthy',
        tableCount: dbStats[0].table_count,
        databaseSize: `${Math.round(dbStats[0].db_size / 1024 / 1024)} MB`,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      throw new HealthCheckError(
        'Database health check failed',
        this.getStatus(key, false, {
          status: 'unhealthy',
          error: error.message,
          timestamp: new Date().toISOString()
        })
      );
    }
  }

  async isRedisHealthy(key: string): Promise<HealthIndicatorResult> {
    // Redis health check implementation
    // You would integrate with your Redis client
    const isHealthy = true; // Implement actual Redis check
    const status = this.getStatus(key, isHealthy, {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString()
    });

    if (isHealthy) {
      return status;
    }
    throw new HealthCheckError('Redis health check failed', status);
  }

  async isExternalServicesHealthy(key: string): Promise<HealthIndicatorResult> {
    // Check external dependencies (email service, SMS gateway, etc.)
    const externalServices = {
      emailService: true, // Implement actual checks
      smsGateway: true,
      fileStorage: true
    };

    const allHealthy = Object.values(externalServices).every(Boolean);
    
    return this.getStatus(key, allHealthy, {
      status: allHealthy ? 'healthy' : 'degraded',
      services: externalServices,
      timestamp: new Date().toISOString()
    });
  }
}
