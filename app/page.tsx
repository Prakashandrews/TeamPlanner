'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";

const API_URL = {
  SIGNIN: `${process.env.NEXT_PUBLIC_HOSTNAME || 'http://localhost:8080/'}api/auth/signin`,
  SIGNUP: `${process.env.NEXT_PUBLIC_HOSTNAME || 'http://localhost:8080/'}api/auth/signup`,
};

const ROUTES = {
  HOME_SCREEN: '/home',
  TEAM_PLAN: '/teamplan'
};

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      username: string;
      email: string;
      mobileNumber?: string;
    };
    token: string;
  };
}

interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      username: string;
      email: string;
      mobileNumber?: string;
    };
    token: string;
  };
}

export default function Home() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState("");
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 5 characters, no other restrictions
    return password.length >= 5;
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && value.length > 10) return;
    setSignupData(prev => ({ ...prev, [name]: value }));
    setSignupError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginData.email || !loginData.password) {
      setLoginError("Email and password are required");
      return;
    }

    if (!validateEmail(loginData.email)) {
      setLoginError("Invalid email format");
      return;
    }

    setIsLoginLoading(true);

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(API_URL.SIGNIN, {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Redirect to home
        router.push(ROUTES.TEAM_PLAN);
      } else {
        setLoginError(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Invalid email or password"
      );
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess(false);

    // Validation
    if (!signupData.firstName || !signupData.lastName || !signupData.username || 
        !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setSignupError("All fields are required");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    if (!validateEmail(signupData.email)) {
      setSignupError("Invalid email format");
      return;
    }

    if (!validatePassword(signupData.password)) {
      setSignupError("Password must be at least 5 characters");
      return;
    }

    if (signupData.mobileNumber && signupData.mobileNumber.length < 10) {
      setSignupError("Invalid mobile number");
      return;
    }

    setIsSignupLoading(true);

    try {
      const response: AxiosResponse<SignupResponse> = await axios.post(API_URL.SIGNUP, {
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        username: signupData.username,
        email: signupData.email,
        mobileNumber: signupData.mobileNumber,
        password: signupData.password,
      });

      if (response.data.success) {
        setSignupSuccess(true);
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Clear form
        setSignupData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          mobileNumber: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push(ROUTES.TEAM_PLAN);
        }, 2000);
      } else {
        setSignupError(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setSignupError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Registration failed"
      );
    } finally {
      setIsSignupLoading(false);
    }
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
          }}>
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h2>

          {isLoginMode ? (
            // Login Form
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "25px", position: "relative" }}>
                <FaEnvelope style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                  fontSize: "18px",
                }} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleLoginChange}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {loginError && (
                <div style={{
                  color: "#e74c3c",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}>
                  {loginError}
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
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSignup}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <FaUser style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#2980b9",
                    fontSize: "16px",
                  }} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      borderRadius: "10px",
                      border: "2px solid #e3e3e3",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <FaUser style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#2980b9",
                    fontSize: "16px",
                  }} />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 40px",
                      borderRadius: "10px",
                      border: "2px solid #e3e3e3",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "15px", position: "relative" }}>
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
                  name="username"
                  placeholder="Username"
                  value={signupData.username}
                  onChange={handleSignupChange}
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
              <div style={{ marginBottom: "15px", position: "relative" }}>
                <FaEnvelope style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                  fontSize: "18px",
                }} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleSignupChange}
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
              <div style={{ marginBottom: "15px", position: "relative" }}>
                <FaPhone style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                  fontSize: "18px",
                }} />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number (optional)"
                  value={signupData.mobileNumber}
                  onChange={handleSignupChange}
                  maxLength={10}
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
              <div style={{ marginBottom: "15px", position: "relative" }}>
                <FaLock style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                  fontSize: "18px",
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div style={{ marginBottom: "15px", position: "relative" }}>
                <FaLock style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2980b9",
                  fontSize: "18px",
                }} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
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
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {signupError && (
                <div style={{
                  color: "#e74c3c",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}>
                  {signupError}
                </div>
              )}
              {signupSuccess && (
                <div style={{
                  color: "#27ae60",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}>
                  Account created successfully! Redirecting...
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
                disabled={isSignupLoading}
              >
                {isSignupLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          <div style={{
            borderTop: "1px solid #e3e3e3",
            paddingTop: "20px",
            marginTop: "10px",
          }}>
            <span style={{ color: "#666", fontSize: "14px" }}>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setLoginError("");
                  setSignupError("");
                  setSignupSuccess(false);
                }}
                style={{
                  color: "#2980b9",
                  textDecoration: "none",
                  fontWeight: "600",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {isLoginMode ? "Sign up" : "Sign in"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 