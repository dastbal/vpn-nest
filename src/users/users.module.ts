import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';

import { UsersController } from './controllers/users.controller';
import { Minute } from './entities/minute.entity';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Minute])],
  controllers: [UsersController],
  providers: [UsersService, AppService],
})
export class UsersModule {}
