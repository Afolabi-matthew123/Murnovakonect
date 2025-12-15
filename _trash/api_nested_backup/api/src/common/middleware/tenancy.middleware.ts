import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Request, Response, NextFunction } from 'express';
import { resolveSlugFromHost } from '../../common/utils/domain.utils';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request & { schoolSlug?: string }, res: Response, next: NextFunction) {
    try {
      const host = (req.hostname || (req.headers && req.headers.host)) as string | undefined;
      const schoolSlug = host ? resolveSlugFromHost(host) : undefined;

      if (schoolSlug) {
        await this.prisma.$executeRawUnsafe(
          `SELECT set_config('murnova.current_school_slug', $1, false)`,
          schoolSlug,
        );
      } else {
        await this.prisma.$executeRawUnsafe(
          `SELECT set_config('murnova.current_school_slug', '', false)`,
        );
      }

      req.schoolSlug = schoolSlug;
    } catch (err) {
      // safe: do not break the request chain for middleware errors in tests
    } finally {
      next();
    }
  }
}
