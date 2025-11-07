import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PrimaryButton, OutlineButton } from '../components/Buttons';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // API call will be added here later

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#5C3D2E] mb-2 font-['Merriweather']">
            Create Account
          </h1>
          <p className="text-[#2D2424]">Join BlogSpace and start sharing your stories</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-700 rounded">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
                disabled={isSubmitting}
                required
              />
              <p className="mt-1 text-xs text-[#5C3D2E]">
                Must be at least 6 characters long
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#5C3D2E] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 border-2 border-[#E0C097] rounded-lg focus:outline-none focus:border-[#B85C38] focus:ring-2 focus:ring-[#B85C38] focus:ring-opacity-20 transition-colors text-[#2D2424]"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Submit Button */}
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </PrimaryButton>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E0C097]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#5C3D2E]">Or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-[#2D2424] mb-4">
              Already have an account?{' '}
              <Link to="/login" className="text-[#B85C38] hover:text-[#5C3D2E] font-semibold">
                Sign in
              </Link>
            </p>
            <Link to="/">
              <OutlineButton className="w-full">
                Back to Home
              </OutlineButton>
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-[#5C3D2E] mb-3 font-['Merriweather']">
            Why Join BlogSpace?
          </h3>
          <ul className="space-y-2 text-sm text-[#2D2424]">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#B85C38] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Share your stories with a global audience
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#B85C38] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Connect with like-minded writers
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#B85C38] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Build your personal brand
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;