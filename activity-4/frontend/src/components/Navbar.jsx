import { NavLink } from "react-router-dom";
import { WiDaySunny, WiCloudy } from "react-icons/wi";
import { AiOutlineHome } from "react-icons/ai";
import { IoStatsChart, IoInformationCircleOutline } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <AiOutlineHome size={20} />, path: "/" },
    { name: "Forecast", icon: <IoStatsChart size={20} />, path: "/forecast" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-md transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* 🌤 Logo */}
        <div className="flex items-center gap-2">
          <WiDaySunny className="text-yellow-400 text-3xl drop-shadow-sm animate-pulse" />
          <span className="font-bold text-xl text-sky-900 tracking-wide select-none">
            WeatherWeatherlang
          </span>
        </div>

        {/* ☁️ Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center font-medium text-sky-800">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-200 ${
                    isActive
                      ? "bg-white/40 text-sky-900 font-semibold shadow-sm"
                      : "hover:bg-white/30 hover:text-sky-900"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center text-sky-900 bg-white/30 p-2 rounded-lg hover:bg-white/50 transition"
        >
          {menuOpen ? (
            <WiCloudy size={26} className="animate-floatCloud" />
          ) : (
            <WiDaySunny size={26} />
          )}
        </button>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-lg border-t border-white/20 shadow-inner animate-slideDown">
          <ul className="flex flex-col items-center py-3 gap-2 text-sky-900 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                      isActive
                        ? "bg-white/40 text-sky-900 font-semibold"
                        : "hover:bg-white/40"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;