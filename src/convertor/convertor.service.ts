/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Conversion } from './currency.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateConversionDto } from './convertor.dto';
import { CreationAttributes } from 'sequelize';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class ConvertorService {
  private readonly logger = new Logger(ConvertorService.name);
  constructor(
    @InjectModel(Conversion)
    private readonly conversionModel: typeof Conversion,
  ) {}

  private async getExchangeRate(from: string, to: string): Promise<number> {
    try{
      const apiKey = process.env.CURRENCY_API_KEY;
      const baseUrl = process.env.CURRENCY_API_URL;
      if (!apiKey || !baseUrl) 
        throw new InternalServerErrorException('Currency API configuration missing');
      const apiUrl = `${baseUrl}/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`;
      const response = await axios.get(apiUrl);
      const rate = response.data?.data?.[to];
      if (!rate || typeof rate !== 'number') {
        this.logger.error(`Invalid exchange rate received for ${from} → ${to}`);
        throw new InternalServerErrorException(`Could not fetch exchange rate for ${from} to ${to}`);
      }
      return rate;
    }
    catch(error){
      this.logger.error(`Error fetching exchange rate: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch exchange rate');
    }
  }

  private async getHistoricalExchangeRate(from: string, to: string, date:Date): Promise<number> {
    try{
      const apiKey = process.env.CURRENCY_API_KEY;
      const baseUrl = process.env.CURRENCY_API_URL;
      if (!apiKey || !baseUrl) 
        throw new InternalServerErrorException('Currency API configuration missing');
      const apiUrl = `${baseUrl}/historical?apikey=${apiKey}&base_currency=${from}&currencies=${to}&date=${date}`;
      const response = await axios.get(apiUrl);
      const data = response.data?.data;
      if (!data) 
        throw new InternalServerErrorException('Invalid API response structure');
      const dateKey = Object.keys(data)[0];
      const rate = dateKey ? data[dateKey]?.[to] : null;
      if (!rate || typeof rate !== 'number') {
        this.logger.error(`Invalid exchange rate received for ${from} → ${to}`);
        throw new InternalServerErrorException(`Could not fetch exchange rate for ${from} to ${to}`);
      }
      return rate;
    }
    catch(error){
      this.logger.error(`Error fetching exchange rate: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch exchange rate');
    }
  }

  async create(data) {
    const { fromCurrency, toCurrency, amount, conversionDate = null} = data;
    let rate = 0;
    let c_date = new Date();
    if(conversionDate == null){
      rate = await this.getExchangeRate(fromCurrency, toCurrency);
    }else{
      rate = await this.getHistoricalExchangeRate(fromCurrency, toCurrency, conversionDate);
      c_date = new Date(conversionDate);
    }
    const result = amount * rate;
    return await this.conversionModel.create({
      fromCurrency,
      toCurrency,
      amount,
      rate,
      result,
      conversionDate: c_date,
    } as any);
  }

  async findAll() {
    return await this.conversionModel.findAll({
      order: [['id', 'DESC']],
    });
  }
}
