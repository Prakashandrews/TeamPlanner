'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";

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

const API_URL = {
  SIGNIN: `${process.env.NEXT_PUBLIC_HOSTNAME}api/auth/signin`,
};

const ROUTES = {
  HOME_SCREEN: '/home',
};

interface LoginResponse {
  data: any; // Replace with your actual response type
}

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inValidUser, setInValidUser] = useState(false);

  const triggerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !password) {
      setIsError(true);
      setInValidUser(false);
      return;
    }
    setIsError(false);
    setInValidUser(false);
    setIsLoading(true);
    axios
      .post<LoginResponse>(API_URL.SIGNIN, {
        username: userName,
        password: password,
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        setIsLoading(false);
        // TODO: Add your user info dispatch here if needed
        router.push(ROUTES.HOME_SCREEN);
      })
      .catch((error: Error) => {
        setIsLoading(false);
        setInValidUser(true);
        console.log(error);
      });
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = "#3498db";
    target.style.transform = "translateY(-2px)";
  };

  const handleButtonOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = "#2980b9";
    target.style.transform = "translateY(0)";
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      background: "linear-gradient(120deg, #2980b9, #8e44ad)",
      overflow: "hidden",
      position: "absolute",
      top: 0,
      left: 0,
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}>
        <div style={{
          maxWidth: "500px",
          width: "90%",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}>
          <h2 style={{
            color: "#2c3e50",
            fontSize: "28px",
            marginBottom: "30px",
            fontWeight: "700",
          }}>Welcome Back</h2>
          <form onSubmit={triggerLogin}>
            <div style={{ marginBottom: "25px", position: "relative" }}>
              <FaUser style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#2980b9",
                fontSize: "18px",
              }} />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 15px 15px 45px",
                  borderRadius: "10px",
                  border: "2px solid #e3e3e3",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "25px", position: "relative" }}>
              <FaLock style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#2980b9",
                fontSize: "18px",
              }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 15px 15px 45px",
                  borderRadius: "10px",
                  border: "2px solid #e3e3e3",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              fontSize: "14px",
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                color: "#666",
                cursor: "pointer",
              }}>
                <input
                  type="checkbox"
                  style={{
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />
                Remember me
              </label>
              <a
                href="#"
                style={{
                  color: "#2980b9",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </a>
            </div>
            {isError && (
              <div style={{
                color: "#e74c3c",
                marginBottom: "15px",
                fontSize: "14px",
              }}>
                Email or Password cannot be empty
              </div>
            )}
            {inValidUser && (
              <div style={{
                color: "#e74c3c",
                marginBottom: "15px",
                fontSize: "14px",
              }}>
                Invalid Username / Password
              </div>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#2980b9",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                marginBottom: "20px",
              }}
              onMouseOver={handleButtonHover}
              onMouseOut={handleButtonOut}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div style={{
            borderTop: "1px solid #e3e3e3",
            paddingTop: "20px",
            marginTop: "10px",
          }}>
            <span style={{ color: "#666", fontSize: "14px" }}>
              Don't have an account?{" "}
              <a
                href="/signup"
                style={{
                  color: "#2980b9",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 