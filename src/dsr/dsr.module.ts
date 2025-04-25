import { Module } from '@nestjs/common';
import { DsrService } from './dsr.service';
import { DsrController } from './dsr.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dsr } from './entities/dsr.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Dsr]),
    UsersModule,
  ],
  controllers: [DsrController],
  providers: [DsrService],
})
export class DsrModule {}