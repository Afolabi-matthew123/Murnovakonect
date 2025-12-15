import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Performance');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url, headers } = request;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const userAgent = headers['user-agent'] || 'unknown';
        const schoolSlug = (request as any).tenancy?.schoolSlug || 'none';

        if (duration > 500) {
          this.logger.warn(
            `Slow request: ${method} ${url} - ${duration}ms (school: ${schoolSlug}, ua: ${userAgent})`,
          );
        }

        if (duration > 100) {
          this.logger.log(
            `${method} ${url} - ${duration}ms - school: ${schoolSlug}`,
          );
        }

        const response = context.switchToHttp().getResponse();
        response.setHeader('X-Response-Time', `${duration}ms`);
        response.setHeader(
          'X-Performance-Budget',
          duration > 150 ? 'exceeded' : 'met',
        );
      }),
    );
  }
}
