import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SkyFrameLayout from "./layout/Skyframelayout";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";

function App() {
  const [weather, setWeather] = useState("sunny");

  return (
    <Router>
      <SkyFrameLayout weather={weather}>
        <Routes>
          <Route path="/" element={<Home onWeatherChange={setWeather} />} />
          <Route path="/forecast" element={<Forecast onWeatherChange={setWeather} />} />
        </Routes>
      </SkyFrameLayout>
    </Router>
  );
}

export default App;

