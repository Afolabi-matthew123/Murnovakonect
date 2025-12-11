import {
  Injectable,
  Logger,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, phone, password, displayName, schoolId, userType } = registerDto;

    if (!email && !phone) {
      throw new BadRequestException('At least one identifier (email or phone) is required');
    }

    if (email) {
      const existingEmailUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingEmailUser) {
        throw new ConflictException('User already exists with this email');
      }
    }

    if (phone) {
      const existingPhoneUser = await this.prisma.user.findUnique({ where: { phone } });
      if (existingPhoneUser) {
        throw new ConflictException('User already exists with this phone number');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        displayName,
        schoolId,
        userType: userType || 'STUDENT',
      },
      include: {
        school: true,
        roles: {
          include: {
            role: {
              include: { permissions: true },
            },
          },
        },
      },
    });

    const tokens = await this.generateTokens(user);

    this.logger.log(`New user registered: ${email || phone}`);
    return { user, ...tokens };
  }

  async login(loginDto: LoginDto) {
    const { identifier, studentId, teacherId, email, phone, password } = loginDto;

    let user: any | null = null;

    if (studentId) {
      user = await this.findUserByIdentifier('studentId', studentId);
    } else if (teacherId) {
      user = await this.findUserByIdentifier('teacherId', teacherId);
    } else if (email) {
      user = await this.findUserByIdentifier('email', email);
    } else if (phone) {
      user = await this.findUserByIdentifier('phone', phone);
    } else if (identifier) {
      user = await this.findUserByGenericIdentifier(identifier);
    } else {
      throw new BadRequestException('No identifier provided');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const tokens = await this.generateTokens(user);

    this.logger.log(
      `User logged in: ${user.email || user.phone || user.studentId || user.teacherId}`,
    );
    return { user, ...tokens };
  }

  private async findUserByIdentifier(field: string, value: string) {
    return this.prisma.user.findUnique({
      where: { [field]: value } as any,
      include: {
        school: true,
        roles: {
          include: {
            role: {
              include: { permissions: true },
            },
          },
        },
      },
    });
  }

  private async findUserByGenericIdentifier(identifier: string) {
    const queries = [
      { field: 'email', value: identifier },
      { field: 'phone', value: identifier },
      { field: 'studentId', value: identifier },
      { field: 'teacherId', value: identifier },
    ];

    for (const query of queries) {
      const user = await this.findUserByIdentifier(query.field, query.value);
      if (user) return user;
    }

    return null;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          school: true,
          roles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('User is not active');
      }

      const tokens = await this.generateTokens(user);
      return { user, ...tokens };
    } catch (error) {
      this.logger.error('Token refresh failed', (error as Error).stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(_refreshToken: string) {
    // Stateless JWT logout: client just discards tokens.
    // Revocation / blacklisting can be added in a later FM.
    this.logger.log('User logged out (stateless JWT)');
    return { message: 'Logged out successfully' };
  }

  async validateUser(payload: any) {
    try {
      return this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          school: true,
          roles: {
            include: {
              role: {
                include: { permissions: true },
              },
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('User validation failed', (error as Error).stack);
      throw error;
    }
  }

  async validateUserCredentials(identifier: string, password: string): Promise<any> {
    try {
      const user = await this.findUserByGenericIdentifier(identifier);

      if (!user) return null;

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return null;

      return user;
    } catch (error) {
      this.logger.error('User validation failed', (error as Error).stack);
      return null;
    }
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      phone: user.phone,
      studentId: user.studentId,
      teacherId: user.teacherId,
      userType: user.userType,
      schoolId: user.schoolId,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async linkProfileToUser(userId: string, profileType: 'student' | 'staff', profileId: string) {
    try {
      if (profileType === 'student') {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            studentId: profileId,
            userType: 'STUDENT',
          },
        });

        await this.prisma.student.update({
          where: { id: profileId },
          data: { userId },
        });
      } else {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            teacherId: profileId,
            userType: 'TEACHER',
          },
        });

        await this.prisma.staff.update({
          where: { id: profileId },
          data: { userId },
        });
      }

      return { success: true, message: 'Profile linked successfully' };
    } catch (error) {
      this.logger.error('Failed to link profile', (error as Error).stack);
      throw error;
    }
  }

  async loginWithUser(user: any) {
    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      const tokens = await this.generateTokens(user);

      this.logger.log(
        `User logged in via LocalAuthGuard: ${user.email || user.phone || user.studentId || user.teacherId}`,
      );
      return { user, ...tokens };
    } catch (error) {
      this.logger.error(`Login error for user ${user.id}:`, (error as Error).stack);
      throw new UnauthorizedException('Login failed');
    }
  }
}
