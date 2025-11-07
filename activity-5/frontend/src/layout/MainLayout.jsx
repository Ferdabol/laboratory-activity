import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Outlet /> {/* Render the page content */}
      </main>
    </>
  );
};

export default MainLayout;
