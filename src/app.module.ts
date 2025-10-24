import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConvertorModule } from './convertor/convertor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels: true,
      synchronize: true, // Only for development
    }),
    ConvertorModule,
  ],
})
export class AppModule {}
