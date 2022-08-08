import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { Minute } from 'src/users/entities/minute.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // 👈 use TypeOrmModule
      inject: [databaseConfig.KEY],
      useFactory: (configService: ConfigType<typeof databaseConfig>) => {
        const { username, password, host, port, name } = configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username,
          database: name,
          password,
          entities: [User, Minute],

          //   url: configService.postgresUrl,
          synchronize: true,
          autoLoadEntities: true,
          //   ssl: {
          //     rejectUnauthorized: false,
          //   },
        };
      },
    }),
  ],

  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
