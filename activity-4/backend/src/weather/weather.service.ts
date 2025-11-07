import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface DailyForecast {
  id: number;
  day: string;
  date: string;
  temperature: number;
  condition: string;
  humidity: number;
  description: string;
  wind: number;
}

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
    this.baseUrl = this.configService.get<string>('OPENWEATHER_BASE_URL') || 'https://api.openweathermap.org/data/2.5';
  }

  async getForecast(city: string = 'Manila'): Promise<DailyForecast[]> {
    const url = `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    const response = await firstValueFrom(this.httpService.get(url));
    const data = response.data;
    
    const dailyForecasts: DailyForecast[] = [];
    const seenDates = new Set();
    
    for (const item of data.list) {
      const dateObj = new Date(item.dt * 1000);
      const date = dateObj.toDateString();
      
      if (!seenDates.has(date) && dailyForecasts.length < 5) {
        seenDates.add(date);
        dailyForecasts.push({
          id: dailyForecasts.length + 1,
          day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
          date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          temperature: Math.round(item.main.temp),
          condition: this.mapWeatherCondition(item.weather[0].main),
          humidity: item.main.humidity,
          description: item.weather[0].description,
          wind: Math.round(item.wind.speed * 3.6),
        });
      }
    }
    
    return dailyForecasts;
  }

  private mapWeatherCondition(condition: string): string {
    const conditionMap = {
      Clear: 'sunny',
      Clouds: 'cloudy',
      Rain: 'rainy',
      Drizzle: 'rainy',
      Thunderstorm: 'stormy',
      Snow: 'rainy',
    };
    return conditionMap[condition] || 'sunny';
  }
}