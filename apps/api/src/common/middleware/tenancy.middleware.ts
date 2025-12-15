import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tenantContext } from '../../database/prisma.service';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const schoolId = req.headers['x-school-id'] as string;

    if (!schoolId) {
      return next();
    }

    tenantContext.run({ schoolId }, () => next());
  }
}
