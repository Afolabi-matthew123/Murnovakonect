import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface TenancyContext {
  host: string;
  schoolSlug?: string;
  module?: string;
  isCustomDomain: boolean;
}

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenancyMiddleware.name);

  use(req: Request & { tenancy?: TenancyContext }, res: Response, next: NextFunction) {
    const host = (req.headers.host || '') as string;
    const hostname = host.split(':')[0];

    let schoolSlug: string | undefined;
    let module: string | undefined;
    let isCustomDomain = false;

    // 1) Local development: localhost:3000 -> default demo school
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      schoolSlug = process.env.DEFAULT_SCHOOL_SLUG || 'demo-academy';
    } else {
      const parts = hostname.split('.');

      // 2) Custom domain like myschool.com.ng
      if (parts.length === 2) {
        isCustomDomain = true;
      }

      // 3) Subdomain-based: slug.murnova.com or module.slug.murnova.com
      if (parts.length >= 3) {
        // example: admin.demo-academy.murnova.com
        if (parts.length > 3) {
          module = parts[0];
          schoolSlug = parts[1];
        } else {
          // example: demo-academy.murnova.com
          schoolSlug = parts[0];
        }
      }
    }

    req.tenancy = {
      host,
      schoolSlug,
      module,
      isCustomDomain,
    };

    this.logger.log(`Tenancy detected: ${JSON.stringify(req.tenancy)}`);

    next();
  }
}
