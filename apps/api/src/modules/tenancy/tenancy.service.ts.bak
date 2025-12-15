import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

export interface TenancyContext {
  host: string;
  schoolSlug?: string;
  module?: string;
  isCustomDomain: boolean;
}

@Injectable()
export class TenancyService {
  private readonly logger = new Logger(TenancyService.name);

  constructor(private prisma: PrismaService) {}

  async detectTenancy(host: string): Promise<TenancyContext> {
    try {
      const hostParts = host.split('.');
      let schoolSlug: string | undefined;
      let isCustomDomain = false;

      // Custom domain or subdomain in production
      if (
        hostParts.length > 2 ||
        (hostParts.length === 2 && !hostParts[1].includes('localhost'))
      ) {
        schoolSlug = await this.findSchoolSlugByDomain(host);
        isCustomDomain = true;
      } else if (hostParts.length === 2 && hostParts[1].includes('localhost')) {
        // Local dev: demo.localhost:3000 -> demo
        schoolSlug = hostParts[0];
      }

      // Extract module if present (e.g. admin.demo.murnovakonect.com)
      let module: string | undefined;
      if (hostParts.length > 2 && !isCustomDomain) {
        module = hostParts[0];
        schoolSlug = hostParts[1];
      }

      return {
        host,
        schoolSlug,
        module,
        isCustomDomain,
      };
    } catch (error) {
      this.logger.error('Tenancy detection failed', (error as Error).stack);
      return {
        host,
        schoolSlug: undefined,
        module: undefined,
        isCustomDomain: false,
      };
    }
  }

  private async findSchoolSlugByDomain(host: string): Promise<string | undefined> {
    try {
      const schoolDomain = await this.prisma.schoolDomain.findFirst({
        where: {
          host,
          verified: true,
        },
        include: {
          school: true,
        },
      });

      return schoolDomain?.school.slug;
    } catch (error) {
      this.logger.error(
        `Failed to find school by domain ${host}`,
        (error as Error).stack,
      );
      return undefined;
    }
  }

  async getCurrentSchool(schoolSlug?: string) {
    try {
      if (!schoolSlug) {
        return null;
      }

      return await this.prisma.school.findUnique({
        where: { slug: schoolSlug },
        include: {
          domains: true,
        },
      });
    } catch (error) {
      this.logger.error(
        `Failed to get school ${schoolSlug}`,
        (error as Error).stack,
      );
      return null;
    }
  }
}
