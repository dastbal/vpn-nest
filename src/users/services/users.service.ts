import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

import { AppService } from 'src/app.service';
import { Minute } from '../entities/minute.entity';
import { CreateMinuteDto } from '../dtos/minute.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Minute) private minuteRepo: Repository<Minute>,
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
          commonName: user.userName.commonName,
        });
      });
      await this.Create(users);
    }
    // if table of users need tobe updated
    // if (oldUsers.length < currentTotalUser) {
    //   data.data.forEach(async (user) => {
    //     oldUsers.forEach(async (oldUser) => {
    //       if (user.userName.commonName.includes(oldUser.commonName)) {
    //         console.log(user.userName.commonName.includes(oldUser.commonName));
    //         console.log(user.userName.commonName);
    //         console.log(oldUser.commonName);
    //         console.log(user.userName);
    //         // console.log(user.userName.commonName.includes(oldUser.commonName));
    //         // const newUser = {
    //         //   name: user.userName.name,
    //         //   lastName: user.userName.lastName,
    //         //   commonName: user.userName.commonName,
    //         // };
    //         // await this.Create(newUser);
    //       }
    //     });
    //   });
    // }
    // if (oldUsers.length < currentTotalUser) {
    //   const commonNames = [];
    //   data.data.forEach(async (user) => {
    //     commonNames.push(user.userName.commonName);
    //   });
    //   console.log(commonNames);
    //   commonNames.forEach((commonName) => {
    //     ol
    //   });
    // }

    return await this.userRepo.find();
  }

  async Create(users) {
    const usersCreated = await this.userRepo.create(users);
    await this.userRepo.insert(usersCreated);
  }
  async findOne(userId: string) {
    const id = parseInt(userId, 10);
    const user = await this.userRepo.findOneBy({
      id,
    });
    // const user = await this.userRepo.findOne(id);
    return user;
  }

  async findMinutesByUser(userId: string) {
    const id = parseInt(userId, 10);
    const minutes = await this.userRepo.findOne({
      relations: ['minutes'],
      where: { id: id },
    });
    const numberOfMinutes = this.countMinutes(minutes.minutes);
    return { numberOfMinutes, minutes };
  }

  async createMinutes() {
    // const minutes: CreateMinuteDto[] = [];
    // const minute: CreateMinuteDto = {};
    const data = await this.rendeVpnData();
    data.data.forEach(async (userData) => {
      const minute = {
        bytesReceived: userData.bytesReceived,
        bytesSent: userData.bytesSent,
        since: new Date(userData.connectedSince),
        status: userData.isConnected,
      };
      console.log('minute', minute);
      const minutescreated = this.minuteRepo.create(minute);
      //   const user = await this.findOne(userData.id);
      minutescreated.user = userData.id;
      //   console.log('minutecreated', minutescreated);
      await this.minuteRepo.save(minutescreated);
    });
    return 'One Minute Registered';
  }

  async createDay() {
    return 'hi';
  }

  // data to render the fronted
  async rendeVpnData() {
    const vpnData = this.appService.getData();
    const users = await this.findAll();
    vpnData.data.forEach((user1) => {
      users.forEach((user2) => {
        if (user1.userName.commonName == user2.commonName) {
          user1.id = user2.id;
        }
      });
    });

    return vpnData;
  }

  countMinutes(minutes: Minute[]): number {
    let countMinutes = 0;

    minutes.forEach((minute) => {
      if (minute.status) {
        countMinutes++;
      }
    });
    return countMinutes;
  }
}
