'use client';
import Link from "next/link";
import { useState } from "react";

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Login</button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don&apos;t have an account? <button onClick={onClose} className="text-pink-500 font-semibold">Register</button>
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

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && value.length > 10) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    // Simple email regex
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
    // Here you would send the API request
    // await axios.post(API_URL.SIGNUP, { ... })
    setTimeout(() => {
      setIsLoading(false);
      setAccCreated(true);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(onClose, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          </div>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" maxLength={10} />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400" />
          {isError && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
          {accCreated && <div className="text-green-600 text-sm text-center">Account created! Redirecting...</div>}
          <button type="submit" className="w-full py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account? <button onClick={onClose} className="text-indigo-600 font-semibold">Login</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f9fb] to-[#f3e8ff] flex flex-col items-center justify-start py-0 px-4">
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
      {/* Header and Navigation */}
      <header className="w-full max-w-7xl flex items-center justify-between py-8 px-2 md:px-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl md:text-3xl text-indigo-700">Investink</span>
        </div>
        <nav className="hidden md:flex gap-10 text-gray-700 text-base font-medium">
          <button className="bg-transparent" onClick={() => setShowLogin(true)}>Home</button>
          <button className="bg-transparent">About</button>
          <button className="bg-transparent">Pricing</button>
          <button className="bg-transparent">Service</button>
          <button className="bg-transparent">Testimonials</button>
        </nav>
        <div className="flex gap-4">
          <button onClick={() => setShowLogin(true)} className="px-5 py-2 rounded-full text-indigo-700 font-semibold hover:bg-indigo-50 transition">Login</button>
          <button onClick={() => setShowRegister(true)} className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-pink-600 transition">Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-0 mb-20 mt-4 md:mt-10">
        <div className="flex-1 flex flex-col gap-7 md:gap-8 items-start">
          <span className="inline-block bg-gray-100 text-gray-700 px-5 py-1.5 rounded-full w-max text-sm font-semibold mb-2 shadow-sm">Coming soon &bull; Investink will have mobile app soon!</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight" style={{lineHeight: '1.1'}}>We're creating better way<br />to invest for the future</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-xl">Intelligent management software to control future investment accounting. Every your funds are taken into account for need future.</p>
          <div className="flex gap-4 mb-2">
            <Link href="#" className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-pink-500 hover:to-pink-600 transition">Discover now</Link>
            <Link href="#" className="px-8 py-3 rounded-full bg-white text-gray-700 font-bold text-lg border border-gray-200 shadow hover:bg-gray-100 transition">Learn more</Link>
          </div>
          <div className="flex gap-12 mt-4">
            <div className="flex flex-col items-start">
              <span className="text-3xl md:text-4xl font-extrabold text-gray-900">12k</span>
              <span className="text-gray-500 text-base md:text-lg font-medium">Years of experience</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-3xl md:text-4xl font-extrabold text-gray-900">24k</span>
              <span className="text-gray-500 text-base md:text-lg font-medium">Satisfied and happy user</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full md:w-auto mb-10 md:mb-0">
          {/* Custom SVG illustration inspired by the provided image */}
          <svg width="400" height="370" viewBox="0 0 400 370" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pinkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F0C3F7" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#B3E0FF" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            {/* Meditating character */}
            <circle cx="200" cy="70" r="50" fill="url(#pinkGrad)" />
            <ellipse cx="170" cy="70" rx="10" ry="5" fill="#fff" opacity="0.7" />
            <ellipse cx="230" cy="70" rx="10" ry="5" fill="#fff" opacity="0.7" />
            <path d="M185 90 Q200 110 215 90" stroke="#fff" strokeWidth="3" fill="none" />
            <path d="M180 60 Q185 80 200 80 Q215 80 220 60" stroke="#fff" strokeWidth="3" fill="none" />
            {/* Arms */}
            <rect x="80" y="120" width="240" height="40" rx="20" fill="url(#blueGrad)" />
            <ellipse cx="90" cy="140" rx="12" ry="12" fill="#F0C3F7" />
            <ellipse cx="310" cy="140" rx="12" ry="12" fill="#F0C3F7" />
            {/* Bank icon */}
            <rect x="120" y="120" width="80" height="60" rx="10" fill="#fff" />
            <rect x="130" y="130" width="60" height="30" rx="4" fill="#6366F1" />
            <rect x="150" y="150" width="20" height="10" rx="2" fill="#fff" />
            <rect x="170" y="150" width="10" height="10" rx="2" fill="#fff" />
            {/* ATM icon */}
            <rect x="80" y="200" width="60" height="60" rx="8" fill="#23284A" />
            <rect x="95" y="215" width="30" height="25" rx="3" fill="#B3E0FF" />
            <rect x="110" y="245" width="10" height="10" rx="2" fill="#fff" />
            {/* Cards icon */}
            <rect x="160" y="200" width="80" height="60" rx="10" fill="#B3E0FF" />
            <rect x="170" y="210" width="60" height="20" rx="3" fill="#fff" />
            <rect x="170" y="235" width="40" height="10" rx="2" fill="#fff" />
            {/* Piggy bank */}
            <ellipse cx="300" cy="250" rx="60" ry="50" fill="url(#pinkGrad)" />
            <ellipse cx="320" cy="250" rx="10" ry="8" fill="#fff" />
            <circle cx="280" cy="250" r="6" fill="#23284A" />
            <ellipse cx="340" cy="270" rx="8" ry="5" fill="#fff" />
            <path d="M340 250 Q350 240 355 260" stroke="#23284A" strokeWidth="3" fill="none" />
            {/* Coins */}
            <ellipse cx="100" cy="180" rx="8" ry="8" fill="#F0C3F7" />
            <ellipse cx="120" cy="170" rx="6" ry="6" fill="#B3E0FF" />
            <ellipse cx="90" cy="220" rx="5" ry="5" fill="#F0C3F7" />
            <ellipse cx="320" cy="200" rx="7" ry="7" fill="#B3E0FF" />
            {/* Money */}
            <rect x="210" y="270" width="30" height="10" rx="2" fill="#B3E0FF" />
            <rect x="250" y="270" width="20" height="8" rx="2" fill="#F0C3F7" />
            {/* Background/floor shadow */}
            <ellipse cx="200" cy="350" rx="120" ry="18" fill="#E0E7FF" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-5xl flex flex-col items-center mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why should choose us</h2>
        <p className="text-gray-600 mb-10 text-lg">Because we always think of user needs and provide the best</p>
        <div className="flex flex-col md:flex-row gap-10 w-full justify-center">
          {/* Trusted by many */}
          <div className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition hover:scale-105">
            <div className="mb-4">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="35" fill="#F0C3F7" />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="32" fill="#7C3AED">$$</text>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by many</h3>
            <p className="text-gray-500 text-base">Free admin fees up to $100 paid up to 2 days in advance with initial direct deposit</p>
          </div>
          {/* Guaranteed safety */}
          <div className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition hover:scale-105">
            <div className="mb-4">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="35" fill="#B3E0FF" />
                <rect x="20" y="25" width="30" height="20" rx="6" fill="#7C3AED" />
                <rect x="30" y="35" width="10" height="10" rx="2" fill="#fff" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Guaranteed safety</h3>
            <p className="text-gray-500 text-base">We use secure process security to protect your information and help prevent unauthorized use</p>
          </div>
          {/* Friendly support */}
          <div className="flex-1 flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 transition hover:scale-105">
            <div className="mb-4">
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="35" fill="#F0C3F7" />
                <ellipse cx="35" cy="45" rx="18" ry="10" fill="#7C3AED" />
                <ellipse cx="35" cy="35" rx="10" ry="10" fill="#fff" />
                <rect x="28" y="28" width="14" height="6" rx="3" fill="#7C3AED" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Friendly support</h3>
            <p className="text-gray-500 text-base">If you have any questions send message to our member service team or check out the help center</p>
          </div>
        </div>
      </section>
    </main>
  );
} 