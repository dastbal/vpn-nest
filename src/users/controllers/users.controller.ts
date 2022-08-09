import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  @ApiOperation({ summary: 'Get All users with VPN' })
  async getUsers() {
    return this.userService.findAll();
  }
  @Get('vpnData')
  @ApiOperation({ summary: 'Get the current Vpn Data' })
  async getVpnDta() {
    return this.userService.rendeVpnData();
  }
  @Get('createMinute')
  @ApiOperation({ summary: 'update the table Minute' })
  async updateMinute() {
    return this.userService.createMinutes();
  }
  @Get(':userId')
  @ApiOperation({ summary: 'get a user by id' })
  async getUser(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }
  @Get(':userId/minutes')
  @ApiOperation({ summary: 'get a user by id' })
  async getMinutesByUser(@Param('userId') userId: string) {
    return this.userService.findMinutesByUser(userId);
  }
}
