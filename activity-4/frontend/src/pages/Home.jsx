import { Link } from 'react-router-dom';
import { WiDaySunny } from 'react-icons/wi';
import Button from '../components/Buttons';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <WiDaySunny className="text-8xl mx-auto mb-4 text-yellow-300" />
        <h1 className="text-5xl font-bold mb-4" 
            style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-display)' }}>
          Weather-Weather-Lang
        </h1>
        <p className="text-xl mb-8" style={{ color: 'var(--color-night-700)', fontFamily: 'var(--font-body)' }}>
          view the 5-day forecast.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/forecast">
            <Button variant="primary">View Forecast</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;