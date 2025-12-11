import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Fm1TestService } from './fm1-test.service';
import { Public } from '../../common/decorators/public.decorator';
import { Request } from 'express';

@ApiTags('fm1-test')
@Controller('fm1-test')
export class Fm1TestController {
  constructor(private readonly fm1TestService: Fm1TestService) {}

  /**
   * Public FM-1 smoke endpoint.
   * Bootstraps two demo tenants with parents + students, idempotently.
   */
  @Public()
  @Post('bootstrap-tenants')
  async bootstrapTenants() {
    return this.fm1TestService.bootstrapDemoTenants();
  }

  /**
   * Public FM-1 smoke endpoint.
   * Returns all schools (minimal projection).
   */
  @Public()
  @Get('schools')
  async listSchools() {
    return this.fm1TestService.listSchools();
  }

  /**
   * Public FM-1 smoke endpoint.
   * Returns per-tenant counts for quick multi-tenant isolation checks.
   */
  @Public()
  @Get('schools/:slug/snapshot')
  async tenantSnapshot(@Param('slug') slug: string) {
    return this.fm1TestService.getTenantSnapshot(slug);
  }

  /**
   * Optional helper: see what tenancy.middleware attached to the request.
   */
  @Public()
  @Get('tenant-context')
  getTenantContext(@Req() req: Request) {
    return (req as any).tenancy ?? null;
  }
}
