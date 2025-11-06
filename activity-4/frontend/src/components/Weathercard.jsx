import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm } from "react-icons/wi";

const WeatherCard = ({ city, temp, condition, humidity, wind }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return <WiDaySunny className="text-yellow-400 text-6xl drop-shadow-md" />;
      case "cloudy":
        return <WiCloudy className="text-slate-400 text-6xl drop-shadow-md" />;
      case "rainy":
        return <WiRain className="text-sky-500 text-6xl drop-shadow-md" />;
      case "stormy":
      case "thunderstorm":
        return <WiThunderstorm className="text-indigo-600 text-6xl drop-shadow-md" />;
      default:
        return <WiDaySunny className="text-yellow-400 text-6xl drop-shadow-md" />;
    }
  };

  const getCardBackground = (condition) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return "from-yellow-200/60 via-white/40 to-sky-100/50";
      case "cloudy":
        return "from-slate-200/70 via-white/40 to-sky-100/30";
      case "rainy":
        return "from-sky-300/60 via-white/30 to-blue-100/50";
      case "stormy":
      case "thunderstorm":
        return "from-indigo-300/70 via-slate-200/40 to-white/20";
      default:
        return "from-yellow-200/50 via-white/30 to-sky-100/50";
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 text-center bg-gradient-to-br ${getCardBackground(
        condition
      )} backdrop-blur-xl border border-white/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-sky-200/40`}
    >
      <h2 className="text-2xl font-semibold text-sky-900">{city}</h2>

      <div className="flex justify-center my-4">{getWeatherIcon(condition)}</div>

      <p className="text-4xl font-bold text-sky-800 drop-shadow-sm">{temp}°C</p>
      <p className="capitalize text-sky-700/90 font-medium">{condition}</p>

      <div className="mt-4 text-sm text-sky-900/70">
        <p>💧 Humidity: {humidity}%</p>
        <p>🌬️ Wind: {wind} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;