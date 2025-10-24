/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ConvertorService } from './convertor.service';
import { CreateConversionDto } from './convertor.dto';

@Controller('convertor')
export class ConvertorController {
  constructor(private readonly currencyService: ConvertorService) {}

  @Post()
  create(@Body() data: CreateConversionDto) {
    return this.currencyService.create(data);
  }

  @Get()
  findAll() {
    return this.currencyService.findAll();
  }
}
