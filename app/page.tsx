'use client';
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");

    // Validation
    if (!formData.email || !formData.password) {
      setIsError(true);
      setErrorMessage("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOSTNAME}api/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success && response.data.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Close modal and redirect to dashboard
        onClose();
        router.push('/dashboard');
      } else {
        setIsError(true);
        setErrorMessage(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToRegister = () => {
    onClose();
    setShowRegister(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your password" 
            />
          </div>
          {isError && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {errorMessage}
            </div>
          )}
          <button 
            type="submit" 
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <button onClick={handleSwitchToRegister} className="text-blue-600 font-semibold hover:text-blue-700">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accCreated, setAccCreated] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && value.length > 10) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccCreated(false);
    setIsError(false);
    setErrorMessage("");

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword ||
        !formData.firstName || !formData.lastName || !formData.mobileNumber) {
      setIsError(true);
      setErrorMessage("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setIsError(true);
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!validateEmail(formData.email)) {
      setIsError(true);
      setErrorMessage("Invalid email format");
      return;
    }
    if (formData.mobileNumber.length < 10) {
      setIsError(true);
      setErrorMessage("Invalid mobile number");
      return;
    }

    setIsError(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_HOSTNAME}api/auth/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      });

      if (response.data.success && response.data.data.token) {
        setAccCreated(true);
        
        // Store token and user data
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          mobileNumber: "",
          password: "",
          confirmPassword: "",
        });
        
        // Show success message and redirect to dashboard after 2 seconds
        setTimeout(() => {
          onClose();
          router.push('/dashboard');
        }, 2000);
      } else {
        setIsError(true);
        setErrorMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              placeholder="First Name" 
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              placeholder="Last Name" 
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Username" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="text" 
            name="mobileNumber" 
            value={formData.mobileNumber} 
            onChange={handleChange} 
            placeholder="Mobile Number" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
            maxLength={10} 
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Password" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
          />
          {isError && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {errorMessage}
            </div>
          )}
          {accCreated && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-lg">
              Account created successfully! Redirecting to dashboard...
            </div>
          )}
          <button 
            type="submit" 
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <button onClick={handleSwitchToLogin} className="text-blue-600 font-semibold hover:text-blue-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewLandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <LoginModal open={showLogin} onClose={handleCloseLogin} />
      <RegisterModal open={showRegister} onClose={handleCloseRegister} />
      
      {/* Hero Section with Background Image */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/corporate-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-20 h-full flex flex-col">
          {/* Header */}
          <header className="w-full max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl text-white">TeamPulse</span>
            </div>
            <nav className="hidden md:flex gap-8 text-white/90 text-sm font-medium">
              <button className="hover:text-white transition">Features</button>
              <Link href="/teamplan" className="hover:text-white transition">Solutions</Link>
              <button className="hover:text-white transition">Pricing</button>
              <button className="hover:text-white transition">Resources</button>
            </nav>
            <div className="flex gap-4">
              <button onClick={handleLoginClick} className="px-4 py-2 text-white hover:text-blue-100 transition">Login</button>
              <button onClick={handleRegisterClick} className="px-4 py-2 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition">Get Started</button>
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Keep Your Team's Pulse Strong
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Monitor, optimize, and enhance your team's performance with real-time insights and intelligent planning.
                </p>
                <div className="flex gap-4">
                  <button onClick={handleRegisterClick} className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your team's capacity and optimize resource allocation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resource Planning</h3>
              <p className="text-gray-600">
                Visualize and optimize your team's capacity with intuitive planning tools and real-time updates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Insights</h3>
              <p className="text-gray-600">
                Make data-driven decisions with comprehensive analytics and performance metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Foster better teamwork with integrated communication and task management tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Team's Productivity
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Increased Efficiency</h3>
                    <p className="text-gray-600">
                      Reduce time spent on manual planning by up to 40% with automated scheduling and resource allocation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Better Resource Utilization</h3>
                    <p className="text-gray-600">
                      Optimize team capacity and reduce idle time with intelligent workload distribution.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Improved Decision Making</h3>
                    <p className="text-gray-600">
                      Make informed decisions with real-time insights and comprehensive analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-4 h-full">
                    {/* Dashboard Header */}
                    <div className="col-span-3 flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-white font-semibold">TeamPulse Dashboard</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="space-y-2">
                      <button className="w-full h-10 bg-white/20 rounded-lg flex items-center gap-2 px-3 text-white hover:bg-white/30 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Overview
                      </button>
                      <button className="w-full h-10 bg-white/20 rounded-lg flex items-center gap-2 px-3 text-white hover:bg-white/30 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Team
                      </button>
                      <button className="w-full h-10 bg-white/20 rounded-lg flex items-center gap-2 px-3 text-white hover:bg-white/30 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Projects
                      </button>
                      <button className="w-full h-10 bg-white/20 rounded-lg flex items-center gap-2 px-3 text-white hover:bg-white/30 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Calendar
                      </button>
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-span-2 space-y-4">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white/80 text-sm mb-1">Total Projects</div>
                          <div className="text-2xl font-bold text-white">24</div>
                          <div className="text-green-400 text-sm mt-1">↑ 12% from last month</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white/80 text-sm mb-1">Team Members</div>
                          <div className="text-2xl font-bold text-white">18</div>
                          <div className="text-green-400 text-sm mt-1">↑ 3 new this week</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="text-white/80 text-sm mb-1">Resource Utilization</div>
                          <div className="text-2xl font-bold text-white">87%</div>
                          <div className="text-yellow-400 text-sm mt-1">Optimal range</div>
                        </div>
                      </div>
                      
                      {/* Chart Area */}
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-white font-semibold">Resource Allocation</div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-white/20 rounded text-white hover:bg-white/30 transition">Week</button>
                            <button className="px-3 py-1 text-sm bg-white/20 rounded text-white hover:bg-white/30 transition">Month</button>
                            <button className="px-3 py-1 text-sm bg-white/20 rounded text-white hover:bg-white/30 transition">Year</button>
                          </div>
                        </div>
                        <div className="h-32 flex items-end gap-2">
                          {[40, 65, 75, 85, 60, 45, 55].map((height, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-blue-400 rounded-t"
                                style={{ height: `${height}%` }}
                              ></div>
                              <div className="text-white/60 text-xs mt-1">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Recent Activity */}
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-white font-semibold mb-4">Recent Activity</div>
                        <div className="space-y-3">
                          {[
                            { user: 'Sarah Johnson', action: 'completed Project Alpha', time: '2h ago' },
                            { user: 'Mike Chen', action: 'updated resource allocation', time: '4h ago' },
                            { user: 'Emma Davis', action: 'added new team member', time: '1d ago' }
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                              <div className="flex-1">
                                <div className="text-white text-sm">
                                  <span className="font-medium">{activity.user}</span> {activity.action}
                                </div>
                                <div className="text-white/60 text-xs">{activity.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Team Planning?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have improved their productivity and resource management with TeamPulse.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleRegisterClick} className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="font-bold text-xl text-white mb-4 block">TeamPulse</span>
              <p className="text-gray-400">
                Real-time team insights and intelligent resource management for modern organizations.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeamPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 