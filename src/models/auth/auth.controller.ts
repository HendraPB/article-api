import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
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
}
