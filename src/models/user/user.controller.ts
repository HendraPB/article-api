import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from './../../role/roles.decorator';

@Controller('user')
@Roles('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }
}
