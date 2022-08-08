import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [databaseConfig],
      isGlobal: true,
      // validationSchema: Joi.object({
      //   API_KEY: Joi.string().required(),
      //   DATABASE_URL: Joi.string().required(),
      // }),
    }),
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
