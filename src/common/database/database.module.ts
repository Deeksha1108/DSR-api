import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dsr-deeksha',
      password: 'postgres',
      database: 'dsr-api',
      autoLoadModels: true,
      synchronize: false, 
      logging: console.log,
      define: {
        underscored: true,
      },
    }),
  ],
})
export class DatabaseModule {}