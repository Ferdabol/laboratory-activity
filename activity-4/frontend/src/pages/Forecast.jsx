import { useEffect, useState } from 'react';
import Button from '../components/Buttons';
import { Searchbar } from '../components/Searchbar';
import WeatherCard from '../components/Weathercard';

const Forecast = ({ onWeatherChange }) => {
  const [forecast, setForecast] = useState([]);
  const [condition, setCondition] = useState('Sunny');
  const [city, setCity] = useState('Manila');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch forecast from backend
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3000/weather/forecast?city=${city}`);
        if (!response.ok) throw new Error('Failed to fetch forecast');
        const data = await response.json();
        setForecast(data);
        
        if (data.length > 0) {
          const newCondition = data[0].condition;
          setCondition(newCondition);
          if (onWeatherChange) {
            onWeatherChange(newCondition);
          }
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, onWeatherChange]);

  const handleCardHover = (newCondition) => {
    setCondition(newCondition);
    if (onWeatherChange) {
      onWeatherChange(newCondition);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      setCity(query.trim());
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-xl">Loading forecast...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-xl text-red-500">Error: {error}</p>
        <Button variant="secondary" onClick={() => window.history.back()}>
          ← Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
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
          Stay prepared with the next few days' weather outlook
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
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-full">
          {forecast.map((day) => (
            <div
              key={day.id}
              onMouseEnter={() => handleCardHover(day.condition)}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <WeatherCard
                city={day.day}
                temp={day.temperature}
                condition={day.condition}
                humidity={day.humidity}
                wind={day.wind}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;