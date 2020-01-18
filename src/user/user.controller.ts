import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  SetMetadata,
  Request,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserRole } from './user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll(@Request() req): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('employee')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findEmployees(): Promise<User[]> {
    const users = await this.userService.findSpecificUsers({
      role: UserRole.EMPLOYEE,
    });
    return users;
  }

  @Get('manager')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findManagers(): Promise<User[]> {
    const users = await this.userService.findSpecificUsers({
      role: UserRole.MANAGER,
    });
    return users;
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAdmins(): Promise<User[]> {
    const users = await this.userService.findSpecificUsers({
      role: UserRole.ADMIN,
    });
    return users;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findUserBy({ id });
    return user;
  }

  @Post()
  async createUser(@Body() userData: UserDto): Promise<User> {
    const user = await this.userService.addUser(userData);
    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateUser(@Body() userData: UserDto, @Param('id') id: string) {
    const updatedUser = this.userService.updateUser(userData, id);
    return updatedUser;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.userService.removeUser(id);
    return 'DELETED ' + id;
  }
}
