import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PerformanceMiddleware implements NestMiddleware {
  private readonly logger = new Logger(PerformanceMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl, ip } = req;

    // Capture response finish
    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      // Log performance metrics
      this.logger.log({
        message: 'API Performance',
        method,
        url: originalUrl,
        statusCode,
        duration: `${duration}ms`,
        contentLength,
        ip,
        userAgent: req.get('user-agent') || '',
        timestamp: new Date().toISOString()
      });

      // Alert on slow requests (above 2 seconds)
      if (duration > 2000) {
        this.logger.warn(`Slow API endpoint: ${method} ${originalUrl} took ${duration}ms`);
      }

      // Alert on server errors
      if (statusCode >= 500) {
        this.logger.error(`API Error: ${method} ${originalUrl} returned ${statusCode}`);
      }
    });

    next();
  }
}
