import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

import { AppService } from 'src/app.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private appService: AppService,
  ) {}

  async findAll() {
    const data = this.appService.getData();
    const currentTotalUser = data.data.length;
    const users: CreateUserDto[] = [];
    const oldUsers = await this.userRepo.find();

    console.log(currentTotalUser);
    console.log(oldUsers.length);

    // if table of user is empty fill it
    if (oldUsers.length == 0) {
      data.data.forEach((user) => {
        users.push({
          name: user.userName.name,
          lastName: user.userName.lastName,
        });
      });
      await this.Create(users);
    }
    // if table of users need tobe updated
    // if (oldUsers.length > currentTotalUser) {
    //   data.data.forEach((user) => {
    //     users.push({
    //       name: user.userName.name,
    //       lastName: user.userName.lastName,
    //     });
    //   });
    //   await this.Create(users);
    // }

    return await this.userRepo.find();
  }

  async Create(users) {
    const usersCreated = await this.userRepo.create(users);
    await this.userRepo.insert(usersCreated);
  }
}
