import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './../../role/roles.decorator';
import { Auth } from './../../auth/auth.decorator';
import { RegisterAuthDto } from './dtos/auth.register.dto';
import { LoginAuthDto } from './dtos/auth.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterAuthDto) {
    return this.AuthService.register(data);
  }

  @Post('login')
  async login(@Body() data: LoginAuthDto) {
    return this.AuthService.login(data);
  }

  @Get('user')
  @Roles('admin', 'user')
  async user(@Auth() user: any) {
    return user;
  }
}
