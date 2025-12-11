import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { 
  HealthCheckService, 
  HttpHealthIndicator, 
  HealthCheck,
  HealthCheckResult 
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../modules/health/prisma.health-indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

@Public()
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.prismaHealth.isHealthy('database'),
    ]);
  }
}
