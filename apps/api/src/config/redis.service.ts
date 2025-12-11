import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;

  constructor() {
    // For FM-1, keep this lazy / optional.
    const url = process.env.REDIS_URL;
    if (url) {
      this.client = new Redis(url);
      this.logger.log('Redis client initialized');
    } else {
      this.logger.warn('REDIS_URL not set; Redis is disabled (OK for FM-1)');
    }
  }

  getClient(): Redis | null {
    return this.client;
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
      this.logger.log('Redis connection closed');
    }
  }
}
