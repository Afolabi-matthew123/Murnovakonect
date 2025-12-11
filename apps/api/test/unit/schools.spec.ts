import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from '../../src/modules/schools/schools.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('SchoolsService', () => {
  let schoolsService: SchoolsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    school: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    schoolBranding: {
      create: jest.fn(),
    },
    schoolDomain: {
      create: jest.fn(),
    },
    role: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    permission: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    schoolsService = module.get<SchoolsService>(SchoolsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new school with branding and domains', async () => {
      const createSchoolDto = {
        name: 'Test School',
        slug: 'test-school',
        domain: 'test.murnovakonect.com',
        primaryColor: '#3B82F6',
        motto: 'Test Motto',
      };

      const mockSchool = {
        id: '1',
        ...createSchoolDto,
        branding: { id: '1' },
        domains: [{ id: '1' }],
      };

      mockPrismaService.school.findUnique.mockResolvedValue(null);
      mockPrismaService.school.create.mockResolvedValue(mockSchool);

      const result = await schoolsService.create(createSchoolDto);

      expect(result).toEqual(mockSchool);
      expect(mockPrismaService.school.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'Test School',
          slug: 'test-school',
          branding: {
            create: {
              primaryColor: '#3B82F6',
              motto: 'Test Motto',
            },
          },
          domains: {
            create: [{
              host: 'test.murnovakonect.com',
              type: 'PORTAL',
              isPrimary: true,
            }],
          },
        }),
        include: {
          branding: true,
          domains: true,
        },
      });
    });
  });
});
