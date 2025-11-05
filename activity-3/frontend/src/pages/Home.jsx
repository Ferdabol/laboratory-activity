import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FaBookOpen, FaPen, FaFolder, FaInfinity, FaSparkles } from 'react-icons/fa';

export default function Home() {
  const features = [
    {
      icon: <FaBookOpen size={40} color="var(--color-text-light)" />,
      title: "Manage Books",
      description: "Organize your personal library with ease",
      link: "/books",
      color: "var(--color-primary)",
    },
    {
      icon: <FaPen size={40} color="var(--color-text-light)" />,
      title: "Track Authors",
      description: "Keep track of your favorite writers",
      link: "/authors",
      color: "var(--color-accent)",
    },
    {
      icon: <FaFolder size={40} color="var(--color-text-light)" />,
      title: "Sort Categories",
      description: "Organize books by genre and topics",
      link: "/categories",
      color: "var(--color-primary)",
    },
  ];

  return (
    <>
 
      <div className="text-center py-12 mb-12">
        <div className="mb-6">
          <FaBookOpen className="text-7xl" style={{ color: "var(--color-primary)" }} />
        </div>
        <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
          Welcome to Your Bookshelf
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: "var(--color-text)" }}>
          Manage your favorite books, authors, and categories in one cozy digital
          space. Your personal library awaits!
        </p>
        <Link to="/books">
          <Button className="text-lg px-8 py-4">
            Explore My Collection
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <Link key={index} to={feature.link}>
            <div className="card text-center group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div
                className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: feature.color, opacity: 0.9 }}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
                {feature.title}
              </h3>
              <p className="text-base mb-4" style={{ color: "var(--color-text)" }}>
                {feature.description}
              </p>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-semibold" style={{ color: "var(--color-accent)" }}>
                  Learn More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="card text-center py-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
          Start Building Your Collection Today
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-accent)" }}>
              <FaInfinity size={48} />
            </div>
            <p className="text-sm" style={{ color: "var(--color-text)" }}>
              Unlimited Books
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-accent)" }}>
              <FaSparkles size={48} />
            </div>
            <p className="text-sm" style={{ color: "var(--color-text)" }}>
              Easy Organization
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{ color: "var(--color-accent)" }}>
              <FaBookOpen size={48} />
            </div>
            <p className="text-sm" style={{ color: "var(--color-text)" }}>
              Reading Tracker
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

