import React, { useState } from "react";
import * as logFunc from "./loginFunctions.js";
import "./logOrsign.css";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError, showSuccess, showInfo } from "../ToastProvider/Toast.js";

export default function LogOrsign({ history }) {
  let [userData, setUserData] = useState({});

  const getToSignUp = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const handleChangeEvent = (e, title) => {
    let value = e.target.value;
    setUserData({ ...userData, [title]: value });
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!userData.email || !emailRegex.test(userData.email)) {
    //   showError("Please enter a valid email address.");
    //   return false;
    // }
    // if (!userData.password || !passwordRule.test(userData.password)) {
    //   showError("Password must be at least 8 characters, including letters and numbers.");
    //   return false;
    // }
    return true;
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      const response = await logFunc.logUserIn(userData);
      const data = response.data;
      let { token, doc } = data;
      sessionStorage.setItem("authToken", token);
      showSuccess("Login successful!");
      if (doc && doc.role && doc.role === "admin") {
        showInfo("Redirecting to admin dashboard...");
        setTimeout(() => history.push("/admin/dashboard"), 1200);
        return;
      }
      setTimeout(() => history.push("/routes"), 1200);
    } catch (err) {
      showError(err?.response?.data?.message || err?.message || "❗ Login failed! Please try again.");
    }
  };

  return (
    <div className="skyline-login">
      <ToastContainer />
      <div className="sky-bg" />
      <div className="stars" />
      <div className="horizon" />
      <div className="clouds">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>
      <div className="flight-path">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path className="path-line" d="M-100,750 Q300,400 700,300 Q1000,220 1540,150" />
        </svg>
      </div>
      <div className="plane-decor">
        <svg viewBox="0 0 100 100">
          <path d="M 10 50 L 90 30 L 80 50 L 90 70 Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 40 50 L 55 20 L 65 50" />
          <path d="M 50 50 L 60 70 L 68 50" />
          <circle cx="85" cy="40" r="1.5" />
        </svg>
      </div>

      <div className="card-wrap">
        <div className="panel-left">
          <div className="brand">
            <div className="brand-tag">Airline Reservation System</div>
            <div className="brand-name">
              Sky<span>Line</span>
              <br />
              Air
            </div>
            <div className="tagline">Elevating every journey</div>
          </div>

          <div className="left-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 17l8-8 4 4 6-6M17 7h4v4" />
                </svg>
              </div>
              <div className="feature-text">
                <div className="feature-title">Real-time Flight Tracking</div>
                <div className="feature-desc">Monitor your flights live with up-to-the-minute status updates</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="feature-text">
                <div className="feature-title">Smart Seat Selection</div>
                <div className="feature-desc">Choose your perfect seat with our interactive cabin map</div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="feature-text">
                <div className="feature-title">Secure Booking</div>
                <div className="feature-desc">Bank-grade encryption protecting every transaction</div>
              </div>
            </div>
          </div>

          <div className="left-footer">© 2025 SkyLine Air · All rights reserved</div>
        </div>

        <div className="panel-right">
          <div className="form-heading">
            <div className="form-title">
              Welcome
              <br />
              back.
            </div>
            <div className="form-subtitle">Sign in to your account</div>
          </div>

          <div className="field-group">
            <div className="field">
              <label className="field-label">Email Address</label>
              <input
                className="field-input"
                type="email"
                placeholder="passenger@skyline.aero"
                name="email"
                value={userData.email || ""}
                required
                autoComplete="off"
                onChange={(e) => handleChangeEvent(e, "email")}
              />
              <div className="field-line" />
            </div>
            <div className="field">
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                placeholder="••••••••••"
                name="password"
                value={userData.password || ""}
                required
                onChange={(e) => handleChangeEvent(e, "password")}
              />
              <div className="field-line" />
            </div>
          </div>

          <div className="options-row">
            <label className="remember">
              <input type="checkbox" />
              <div className="check-box" />
              <span className="remember-text">Keep me signed in</span>
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button className="btn-login" onClick={submitData}>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Access Your Journey
            </span>
          </button>

          <div className="divider">
            <div className="divider-line" />
            <div className="divider-text">or continue with</div>
            <div className="divider-line" />
          </div>

          <div className="social-row">
            <button type="button" className="btn-social">
              <FaFacebookF />
              Facebook
            </button>
            <button type="button" className="btn-social">
              <FaTwitterSquare />
              Twitter
            </button>
          </div>

          <div className="signup-prompt">
            New to SkyLine?{" "}
            <a href="#" onClick={(e) => getToSignUp(e)}>
              Create an account →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
