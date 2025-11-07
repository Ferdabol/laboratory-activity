import { Link } from 'react-router-dom';
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm } from 'react-icons/wi';
import WeatherCard from '../components/Weathercard';
import Button from '../components/Buttons';
import { useMemo, useEffect } from 'react';

const Home = ({ onWeatherChange }) => {
  // Mock current weather data 
  const currentWeather = {
    location: 'Your Location',
    temperature: 24,
    condition: 'rainy', 
    humidity: 50
  };

  // Notify parent about weather change
  useEffect(() => {
    if (onWeatherChange) {
      onWeatherChange(currentWeather.condition);
    }
  }, [currentWeather.condition, onWeatherChange]);


  const WeatherIcon = useMemo(() => {
    switch (currentWeather.condition.toLowerCase()) {
      case 'sunny':
        return <WiDaySunny className="text-8xl mx-auto mb-4 text-yellow-300" />;
      case 'cloudy':
        return <WiCloudy className="text-8xl mx-auto mb-4 text-gray-400" />;
      case 'rainy':
        return <WiRain className="text-8xl mx-auto mb-4 text-blue-300" />;
      case 'stormy':
        return <WiThunderstorm className="text-8xl mx-auto mb-4 text-gray-500" />;
      default:
        return <WiDaySunny className="text-8xl mx-auto mb-4 text-yellow-300" />;
    }
  }, [currentWeather.condition]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        {WeatherIcon}
        <h1 className="text-5xl font-bold mb-4" 
            style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-display)' }}>
          Weather-Weather-Lang
        </h1>
        <p className="text-xl mb-8" style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-body)' }}>
          view current weather and the 8-day forecast.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/forecast">
            <Button variant="primary">View Forecast</Button>
          </Link>
        </div>
      </div>
      
      {/* Current Weather Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8" 
            style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-display)' }}>
          Current Weather
        </h2>
        <div className="flex justify-center">
          <WeatherCard weather={currentWeather} />
        </div>
      </div>
    </div>
  );
};

export default Home;