import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto, GetUserByIdDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async createUser(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login(data: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials not found');
    }

    const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Credentials not found');
    }

    const token = await this.getToken(user.id, user.email);

    return token;
  }

  async getUserById(data: GetUserByIdDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getToken(userId: number, email: string): Promise<{ token: string }> {
    const payload = {
      user_id: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    });

    return {
      token: token,
    };
  }
}
