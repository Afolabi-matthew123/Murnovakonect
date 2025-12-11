import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        const response = context.switchToHttp().getResponse();
        
        // Log slow requests
        if (duration > 500) { // 500ms threshold
          console.warn(`Slow request: ${duration}ms - ${request.method} ${request.url}`);
        }
        
        // Add performance headers
        response.set('X-Response-Time', `${duration}ms`);
        response.set('X-Performance-Metrics', `total=${duration}ms`);
        
        // TODO: Send metrics to monitoring service
        if (duration > 150) { // Target: < 150ms
          console.log(`Performance alert: Request took ${duration}ms (target: <150ms)`);
        }
      }),
    );
  }
}
