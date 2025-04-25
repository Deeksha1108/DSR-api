import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './common/auth/auth.module';
import { RedisModule } from './common/utils/redis.module';
import { MailerModule } from './common/utils/mailer.module';
import { UsersModule } from './users/users.module';
import { DsrModule } from './dsr/dsr.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    }),
    DatabaseModule,
    AuthModule,
    RedisModule,
    MailerModule,
    UsersModule,
    DsrModule,
  ],
})
export class AppModule {}