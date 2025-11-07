import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('forecast')
  @ApiOperation({ summary: 'Get 5-day weather forecast for a city' })
  @ApiQuery({ name: 'city', required: false, description: 'City name (default: Manila)' })
  async getForecast(@Query('city') city?: string) {
    return this.weatherService.getForecast(city);
  }
}