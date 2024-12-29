import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAuth } from './dtos/auth.register.dto';
import { LoginAuth } from './dtos/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterAuth): Promise<any> {
    return await this.prisma.user.create({
      data: {
        username: dto.username,
        name: dto.name,
        password: await bcrypt.hash(dto.password, 10)
      }
    });
  }

  async login(dto: LoginAuth): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username }
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign(user)
    };
  }
}
