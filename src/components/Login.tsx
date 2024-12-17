import React, { useState } from "react";
import axios from "axios";
import { Getuser } from "../services/auth/user";

const Login = () => {
  const [emailOrPhoneNo, setEmailOrPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const bodyData = {
      domainId: 7,
      terminal: 1,
      emailOrPhoneNo,
      password,
      isMobile: false,
      os: "Windows",
      osVersion: "11.0",
      browser: "Chrome",
      browserVersion: "131.0.0.0",
      screen: "1920 x 1080",
      cookies: true,
      terminalVersion: 40008,
    };

    try {
      console.log("Sending login request with:", bodyData);
      const response = await axios.post(
        "https://api.staging.kookaat.dev/Auth/Token/GetIgnoreCaptcha",
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      const token = response.data.returnValue.token;

      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored in localStorage:", token);
        alert("Login successful!");
        const userInfo = await Getuser();
        console.log(userInfo.data.returnValue);
        setName(userInfo.data.returnValue.userData.lastname);
      } else {
        if (response.data.code && response.data.messages) {
          setError(response.data.messages.join(", "));
        } else {
          setError("Token not found in the response.");
        }
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        setError(err.response.data.messages?.join(", ") || "Login failed!");
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response from server. Please try again later.");
      } else {
        console.error("Error setting up request:", err.message);
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div>
          <label>Email or Phone:</label>
          <input
            type="text"
            value={emailOrPhoneNo}
            onChange={(e) => setEmailOrPhoneNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>{name}</p>
      </form>
    </div>
  );
};

export default Login;
