import React, { useState } from "react";
import * as logFunc from "./loginFunctions.js";
import "./logOrsign.css";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
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

  // ---- Submission function ----
  const submitData = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      debugger;
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
    <div className="container">
      <ToastContainer />
      <section className="myform-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="form-area login-form">
                <div className="form-content">
                  <h2>Login</h2>
                  <p>you chose the right option</p>
                  <ul>
                    <li>
                      <a href="/#" className="facebook">
                        <FaFacebookF />
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="/#" className="twitter">
                        <FaTwitterSquare />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="form-input">
                  <h2>Enter Credentials</h2>
                  <form
                    onSubmit={(e) => {
                      submitData(e);
                    }}
                  >
                    <div class="form-group">
                      <input
                        className="loginInfo"
                        // type="email"
                        name="email"
                        value={userData.email || ""}
                        required
                        onChange={(e) => handleChangeEvent(e, "email")}
                      />
                      <label>Email-Id</label>
                    </div>
                    <div class="form-group">
                      <input className="loginInfo" type="password" name="password" required onChange={(e) => handleChangeEvent(e, "password")} />
                      <label>password</label>
                    </div>
                    <div class="myform-button">
                      <button type="submit" className="myform-btn">
                        Login
                      </button>
                    </div>
                    <div>
                      <small className="form-text text-muted signup-text">Already a User?</small>
                      <span className="signUPtext">
                        <a href="/#" onClick={(e) => getToSignUp(e)}>
                          Sign-Up
                        </a>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
