import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BusinessMetricsService {
  private readonly logger = new Logger(BusinessMetricsService.name);
  
  constructor(private prisma: PrismaService) {}

  async collectDailyMetrics(): Promise<void> {
    try {
      const metrics = {
        timestamp: new Date(),
        totalSchools: await this.getTotalSchools(),
        totalStudents: await this.getTotalStudents(),
        totalStaff: await this.getTotalStaff(),
        activeSubscriptions: await this.getActiveSubscriptions(),
        dailyAttendance: await this.getDailyAttendanceRate(),
        feeCollectionRate: await this.getFeeCollectionRate(),
        systemUptime: process.uptime()
      };

      this.logger.log('Daily Business Metrics Collected', metrics);
      
      // Store metrics for historical analysis
      await this.storeMetrics(metrics);
      
    } catch (error: any) {
      this.logger.error('Failed to collect business metrics:', error);
    }
  }

  private async getTotalSchools(): Promise<number> {
    return this.prisma.school.count();
  }

  private async getTotalStudents(): Promise<number> {
    return this.prisma.student.count();
  }

  private async getTotalStaff(): Promise<number> {
    return this.prisma.staff.count();
  }

  private async getActiveSubscriptions(): Promise<number> {
    return this.prisma.parentPortalSubscription.count({
      where: { status: 'PAID' }
    });
  }

  private async getDailyAttendanceRate(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalStudents = await this.prisma.student.count();
    if (totalStudents === 0) return 0;

    const presentCount = await this.prisma.attendanceRecord.count({
      where: { 
        date: { gte: today },
        status: 'PRESENT'
      }
    });

    return (presentCount / totalStudents) * 100;
  }

  private async getFeeCollectionRate(): Promise<number> {
    const totalInvoices = await this.prisma.feeInvoice.count();
    if (totalInvoices === 0) return 0;

    const paidInvoices = await this.prisma.feeInvoice.count({
      where: { status: 'PAID' }
    });

    return (paidInvoices / totalInvoices) * 100;
  }

  private async storeMetrics(metrics: any): Promise<void> {
    await this.prisma.analyticsSnapshot.create({
      data: {
        schoolId: 'system', // System-wide metrics
        scope: 'PLATFORM',
        scopeId: 'metrics',
        data: metrics
      }
    });
  }

  async getPlatformHealth(): Promise<any> {
    return {
      database: await this.checkDatabaseHealth(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  }

  private async checkDatabaseHealth(): Promise<any> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', responseTime: 'normal' };
    } catch (error: any) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}
