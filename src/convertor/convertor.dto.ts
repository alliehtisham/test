/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/currency/dto/create-conversion.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConversionDto {
  @IsString()
  @IsNotEmpty({ message: 'fromCurrency is required' })
  fromCurrency: string;

  @IsString()
  @IsNotEmpty({ message: 'toCurrency is required' })
  toCurrency: string;

  @IsNotEmpty({ message: 'amount is required' })
  amount: number;

  @IsOptional()
  conversionDate: Date;
}
