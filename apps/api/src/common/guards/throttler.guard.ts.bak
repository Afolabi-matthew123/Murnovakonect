import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Use tenant + IP for rate limiting to prevent cross-tenant abuse
    const tenant = req.tenant?.schoolSlug || 'global';
    const ip = req.ip;
    return `${tenant}:${ip}`;
  }
}
