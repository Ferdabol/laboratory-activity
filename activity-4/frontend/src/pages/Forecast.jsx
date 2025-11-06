import { useEffect, useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm } from 'react-icons/wi';
import WeatherCard from '../components/Weathercard';
import Button from '../components/Buttons';
import { Searchbar } from '../components/Searchbar';

const Forecast = ({ onWeatherChange }) => {
  const [forecast, setForecast] = useState([]);
  const [condition, setCondition] = useState('Sunny');
  const [city, setCity] = useState('Your City');

  // Mock forecast data 
  const getForecastForCity = (city) => {
    const cityData = {
      'london': [
        { day: 'Today', temperature: 18, condition: 'Cloudy', humidity: 65 },
        { day: 'Tomorrow', temperature: 20, condition: 'Rainy', humidity: 75 },
        { day: 'Fri', temperature: 17, condition: 'Sunny', humidity: 60 },
        { day: 'Sat', temperature: 19, condition: 'Cloudy', humidity: 70 },
        { day: 'Sun', temperature: 16, condition: 'Stormy', humidity: 85 }
      ],
      'tokyo': [
        { day: 'Today', temperature: 28, condition: 'Sunny', humidity: 55 },
        { day: 'Tomorrow', temperature: 30, condition: 'Cloudy', humidity: 60 },
        { day: 'Fri', temperature: 27, condition: 'Rainy', humidity: 70 },
        { day: 'Sat', temperature: 29, condition: 'Sunny', humidity: 50 },
        { day: 'Sun', temperature: 26, condition: 'Stormy', humidity: 80 }
      ],
      'new york': [
        { day: 'Today', temperature: 22, condition: 'Sunny', humidity: 50 },
        { day: 'Tomorrow', temperature: 24, condition: 'Cloudy', humidity: 55 },
        { day: 'Fri', temperature: 21, condition: 'Rainy', humidity: 65 },
        { day: 'Sat', temperature: 23, condition: 'Sunny', humidity: 45 },
        { day: 'Sun', temperature: 20, condition: 'Stormy', humidity: 75 }
      ]
    };
    return cityData[city.toLowerCase()] || [
      { day: 'Today', temperature: 26, condition: 'Sunny', humidity: 55 },
      { day: 'Tomorrow', temperature: 28, condition: 'Cloudy', humidity: 60 },
      { day: 'Fri', temperature: 25, condition: 'Rainy', humidity: 70 },
      { day: 'Sat', temperature: 27, condition: 'Sunny', humidity: 50 },
      { day: 'Sun', temperature: 24, condition: 'Stormy', humidity: 80 }
    ];
  };

  useEffect(() => {
    const data = getForecastForCity(city);
    setForecast(data);
    const newCondition = data[0].condition;
    setCondition(newCondition);
    if (onWeatherChange) {
      onWeatherChange(newCondition);
    }
  }, [city, onWeatherChange]);


  const handleCardHover = (newCondition) => {
    setCondition(newCondition);
    if (onWeatherChange) {
      onWeatherChange(newCondition);
    }
  };


  const backgroundStyle = (() => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'bg-gradient-to-b from-yellow-100 via-orange-100 to-sky-100';
      case 'cloudy':
        return 'bg-gradient-to-b from-gray-100 via-gray-200 to-blue-50';
      case 'rainy':
        return 'bg-gradient-to-b from-blue-100 via-blue-200 to-gray-100';
      case 'stormy':
        return 'bg-gradient-to-b from-gray-200 via-gray-300 to-gray-100';
      default:
        return 'bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300';
    }
  })();


  const getIcon = (cond) => {
    switch (cond.toLowerCase()) {
      case 'sunny':
        return <WiDaySunny className="text-6xl text-yellow-300" />;
      case 'cloudy':
        return <WiCloudy className="text-6xl text-gray-400" />;
      case 'rainy':
        return <WiRain className="text-6xl text-blue-300" />;
      case 'stormy':
        return <WiThunderstorm className="text-6xl text-gray-500" />;
      default:
        return <WiDaySunny className="text-6xl text-yellow-300" />;
    }
  };

  const handleSearch = (query) => {
    setCity(query);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-display)' }}
        >
          5-Day Forecast for {city}
        </h1>
        <p
          className="text-lg mb-6"
          style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-body)' }}
        >
          Stay prepared with the next few days' weather outlook.
        </p>
        <Button variant="secondary" onClick={() => window.history.back()}>
          ← Back
        </Button>
      </div>

      {/* Searchbar */}
      <div className="mb-8 flex justify-center">
        <Searchbar onSearch={handleSearch} />
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={() => handleCardHover(day.condition)}
          >
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-display)' }}
            >
              {day.day}
            </h2>
            {getIcon(day.condition)}
            <p className="mt-3 text-lg font-bold" style={{ color: 'var(--color-night-700)' }}>
              {day.temperature}°C
            </p>
            <p className="text-sm opacity-80">{day.condition}</p>
            <p className="text-sm opacity-70 mt-1">💧 {day.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;