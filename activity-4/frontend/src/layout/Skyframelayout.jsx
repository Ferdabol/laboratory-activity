import Navbar from "../components/Navbar";

const SkyFrameLayout = ({ children, weather = "sunny" }) => {
  const getBackground = (weather) => {
    switch (weather?.toLowerCase()) {
      case "sunny":
        return "from-yellow-100 via-orange-100 to-sky-100";
      case "cloudy":
        return "from-gray-100 via-gray-200 to-blue-50";
      case "rainy":
        return "from-blue-100 via-blue-200 to-gray-100";
      case "stormy":
      case "thunderstorm":
        return "from-gray-200 via-gray-300 to-gray-100";
      default:
        return "from-sky-100 via-sky-200 to-sky-300";
    }
  };

  const getGlow = (weather) => {
    switch (weather?.toLowerCase()) {
      case "sunny":
        return "bg-yellow-100/60";
      case "cloudy":
        return "bg-slate-100/60";
      case "rainy":
        return "bg-sky-200/60";
      case "stormy":
      case "thunderstorm":
        return "bg-indigo-200/40";
      default:
        return "bg-yellow-100/50";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-all duration-700 ease-out 
      bg-gradient-to-b ${getBackground(weather)} text-slate-800`}
    >
      {/* Background glow based on weather */}
      <div
        className={`absolute inset-0 opacity-30 ${getGlow(
          weather
        )} blur-3xl transition-all duration-700`}
      ></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[140%] h-[200px] bg-gradient-to-r from-white/30 via-yellow-50/20 to-sky-50/30 rotate-12 blur-3xl opacity-40"></div>
      </div>

      <Navbar />

      {/* Weather glass frame */}
      <main className="container mx-auto px-4 py-10 flex-1 relative z-10">
        <div className="relative rounded-3xl shadow-2xl backdrop-blur-lg border border-white/30 bg-white/20 overflow-hidden transition-all duration-500 hover:shadow-sky-200/40">
          <div className="absolute top-0 left-0 right-0 h-[8px] bg-gradient-to-r from-white via-sky-50 to-transparent opacity-70 rounded-t-3xl"></div>

          <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/40 blur-sm"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-white/40 blur-sm"></div>
          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 min-h-[70vh]">{children}</div>
          <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-gradient-to-r from-white/20 via-sky-100/20 to-yellow-100/30 rounded-b-3xl"></div>
        </div>
      </main>
    </div>
  );
};

export default SkyFrameLayout;