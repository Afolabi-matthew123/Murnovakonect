import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('superadmin')
@UseGuards(JwtAuthGuard)
export class SuperAdminController {
  
  @Get('dashboard')
  @Permissions('schools:read', 'users:read') // Super admin has all permissions
  getDashboard() {
    return {
      message: 'Super Admin Dashboard',
      metrics: {
        totalSchools: 0, // TODO: Implement actual metrics
        totalUsers: 0,
        activeSubscriptions: 0,
      },
    };
  }

  @Get('schools')
  @Permissions('schools:read')
  getAllSchools() {
    // This will be handled by the schools controller
    // but accessible via superadmin route without tenant scope
    return { message: 'All schools (super admin view)' };
  }
}
