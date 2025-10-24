import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversion } from './currency.model';
import { ConvertorController } from './convertor.controller';
import { ConvertorService } from './convertor.service';

@Module({
  imports: [SequelizeModule.forFeature([Conversion])],
  controllers: [ConvertorController],
  providers: [ConvertorService],
})
export class ConvertorModule {}
