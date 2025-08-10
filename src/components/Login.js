import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      onLogin();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-all duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Branding & Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 py-12 relative">
          <div className="max-w-lg">
            {/* App Logo & Title */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                  <Sparkles className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">Subscription Tracker</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">Master Your Digital Life</p>
                </div>
              </div>
            </div>

            {/* Hook Lines */}
            <div className="space-y-6 mb-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  Never Miss a <span className="gradient-text">Renewal</span> Again
                </h2>
                <h3 className="text-xl text-gray-700 dark:text-gray-300">
                  Track, Analyze & Optimize Your Subscriptions
                </h3>
              </div>
              
              {/* Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700 dark:text-gray-300">Smart cost calculations & insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-gray-700 dark:text-gray-300">Beautiful analytics & visualizations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-gray-700 dark:text-gray-300">Renewal alerts & countdowns</span>
                </div>
                
              </div>
            </div>

            {/* Content Paragraph */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Take control of your digital subscriptions with our intelligent tracking platform. 
                Get insights into your spending patterns, never miss important renewals, and 
                optimize your subscription portfolio for maximum value.
              </p>
              {/* <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Whether it's streaming services, productivity tools, or software subscriptions, 
                we help you stay organized and make informed decisions about your digital investments.
              </p> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Forever</div>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Designed & Developed with ❤️ by
                  </p>
                  <p className="text-lg font-semibold gradient-text">Syed Rahman</p>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-xs font-bold">SR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="card p-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              
              <div className="relative">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                    <Sparkles className="text-white" size={28} />
                  </div>
                  <h1 className="text-3xl font-bold gradient-text mb-2">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isSignUp ? 'Start tracking your subscriptions' : 'Sign in to your account'}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field pl-12"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="input-field pl-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Confirm Password Field (Sign Up only) */}
                  {isSignUp && (
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="input-field pl-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2 py-4 text-lg"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>

                {/* Toggle Sign Up/Login */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setError('');
                        setFormData({ email: '', password: '', confirmPassword: '' });
                      }}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 