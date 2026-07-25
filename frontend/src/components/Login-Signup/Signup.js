import React, { useState } from "react";
import * as signupFunc from "./SignupFunctions";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import bgImage from "../../assets/flight1.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');

  :root {
    --navy: #0a1628;
    --deep: #0d1f3c;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --sky: #4aa8d8;
    --white: #f5f3ef;
    --muted: rgba(245,243,239,0.45);
    --glass-border: rgba(201,168,76,0.2);
  }

  .skyline-signup * { box-sizing: border-box; margin: 0; padding: 0; }

  .skyline-signup {
    font-family: 'Montserrat', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 20px;
    background-color: #0a1628;
  }

  /* ── LAYER 1: real photo ── */
  .skyline-signup .bg-image {
    position: fixed; inset: 0; z-index: 0;
    background-image: var(--bg-url);
    background-size: cover;
    background-position: center 40%;
  }

  /* ── LAYER 2: Side Fade overlay on top of photo ── */
  .skyline-signup .bg-image::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      90deg,
      rgba(10, 22, 40, 0.08)  0%,
      rgba(10, 22, 40, 0.45) 30%,
      rgba(10, 22, 40, 0.82) 58%,
      rgba(10, 22, 40, 0.97) 100%
    );
  }

  /* ── LAYER 3: top + bottom cinematic vignette ── */
  .skyline-signup .bg-vignette {
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(180deg, rgba(5,10,20,0.55) 0%, transparent 22%),
      linear-gradient(0deg,   rgba(5,10,20,0.55) 0%, transparent 22%);
  }

  /* Stars */
  .skyline-signup .stars {
    position: fixed; inset: 0; z-index: 2; pointer-events: none;
    background-image:
      radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
      radial-gradient(1px 1px at 30% 8%,  rgba(255,255,255,0.6) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 52% 20%, rgba(201,168,76,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 72% 6%,  rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 88% 22%, rgba(255,255,255,0.7) 0%, transparent 100%),
      radial-gradient(1px 1px at 18% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 65% 35%, rgba(201,168,76,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 45% 60%, rgba(255,255,255,0.35) 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 55%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 5%  75%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1.5px 1.5px at 92% 70%, rgba(255,255,255,0.5) 0%, transparent 100%);
  }

  .skyline-signup .flight-path {
    position: fixed; inset: 0; z-index: 3; pointer-events: none; overflow: hidden;
  }
  .skyline-signup .flight-path svg { width: 100%; height: 100%; }
  .skyline-signup .path-line {
    stroke: var(--gold); stroke-width: 0.5; fill: none;
    stroke-dasharray: 8 6; opacity: 0.18;
    animation: dashMove 4s linear infinite;
  }
  @keyframes dashMove { to { stroke-dashoffset: -56; } }

  .skyline-signup .plane-decor {
    position: fixed; z-index: 4; top: 15%; right: 8%;
    opacity: 0.14; pointer-events: none;
    animation: floatPlane 9s ease-in-out infinite;
  }
  @keyframes floatPlane {
    0%,100% { transform: translateY(0) rotate(-12deg); }
    50%      { transform: translateY(-20px) rotate(-9deg); }
  }

  /* Card */
  .skyline-signup .card-wrap {
    position: relative; z-index: 10;
    display: flex;
    width: min(860px, 96vw);
    min-height: 360px;
    max-height: calc(100vh - 48px);
    border-radius: 2px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px var(--glass-border),
      0 40px 100px rgba(0,0,0,0.7),
      0 0 80px rgba(201,168,76,0.06);
    animation: cardReveal 1.1s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Left panel — semi-transparent so image glows through */
  .skyline-signup .panel-left {
    flex: 0 0 280px;
    background: linear-gradient(145deg,
      rgba(201,168,76,0.08) 0%,
      rgba(13,31,60,0.88)   40%,
      rgba(10,22,40,0.92)   100%
    );
    backdrop-filter: blur(6px);
    border-right: 1px solid var(--glass-border);
    padding: 48px 36px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .skyline-signup .panel-left::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .skyline-signup .panel-left::after {
    content: ''; position: absolute;
    bottom: -80px; right: -80px;
    width: 240px; height: 240px;
    border: 1px solid rgba(201,168,76,0.06);
    border-radius: 50%; pointer-events: none;
  }

  .skyline-signup .brand { animation: fadeUp 0.8s 0.3s both; }
  .skyline-signup .brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px; font-weight: 300; color: var(--white);
    line-height: 1.1; letter-spacing: -0.5px;
  }
  .skyline-signup .brand-name span { color: var(--gold); }
  .skyline-signup .tagline {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); font-weight: 300; margin-top: 8px;
  }

  .skyline-signup .left-steps {
    display: flex; flex-direction: column; gap: 12px;
    animation: fadeUp 0.8s 0.5s both;
  }
  .skyline-signup .step-row { display: flex; align-items: flex-start; gap: 14px; }
  .skyline-signup .step-num {
    width: 26px; height: 26px; flex-shrink: 0;
    border: 1px solid rgba(201,168,76,0.25);
    font-size: 10px; font-weight: 600; color: var(--gold);
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
  }
  .skyline-signup .step-info { flex: 1; }
  .skyline-signup .step-name { font-size: 11px; font-weight: 500; color: var(--white); letter-spacing: 0.3px; }
  .skyline-signup .step-desc { font-size: 10px; color: var(--muted); font-weight: 300; margin-top: 2px; line-height: 1.5; }

  .skyline-signup .left-footer {
    font-size: 9.5px; color: rgba(245,243,239,0.18);
    letter-spacing: 1px; text-transform: uppercase;
    animation: fadeUp 0.8s 0.7s both;
  }

  /* Right form panel */
  .skyline-signup .panel-right {
    flex: 1;
    background: rgba(8, 18, 35, 0.88);
    backdrop-filter: blur(28px);
    padding: 48px 44px;
    display: flex; flex-direction: column; justify-content: center;
    position: relative;
  }
  .skyline-signup .panel-right::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(74,168,216,0.4), transparent);
  }

  .skyline-signup .form-heading { margin-bottom: 30px; animation: fadeUp 0.8s 0.4s both; }
  .skyline-signup .form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 300; color: var(--white);
    letter-spacing: -0.3px; line-height: 1.1;
  }
  .skyline-signup .form-subtitle {
    font-size: 10px; color: var(--muted); letter-spacing: 2px;
    text-transform: uppercase; font-weight: 300; margin-top: 5px;
  }

  .skyline-signup .fields-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px 16px; margin-bottom: 14px;
    animation: fadeUp 0.8s 0.55s both;
  }
  .skyline-signup .field-full { grid-column: 1 / -1; }
  .skyline-signup .field { position: relative; }

  .skyline-signup .field-label {
    font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 7px; display: block;
  }
  .skyline-signup .field-input {
    width: 100%; background: transparent; border: none;
    border-bottom: 1px solid rgba(245,243,239,0.12);
    padding: 9px 0; color: var(--white);
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 300; letter-spacing: 0.3px;
    outline: none; transition: border-color 0.3s; caret-color: var(--gold);
  }
  .skyline-signup .field-input::placeholder { color: rgba(245,243,239,0.18); font-size: 11px; }
  .skyline-signup .field-input:focus { border-bottom-color: transparent; }
  .skyline-signup .field-input:focus + .field-line { transform: scaleX(1); }

  /* Autofill fix */
  .skyline-signup .field-input:-webkit-autofill,
  .skyline-signup .field-input:-webkit-autofill:hover,
  .skyline-signup .field-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #08121f inset !important;
    -webkit-text-fill-color: #f5f3ef !important;
    caret-color: #c9a84c !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  .skyline-signup .field-line {
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, var(--gold), var(--sky));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }

  .skyline-signup .gender-row {
    display: flex; gap: 20px; padding: 9px 0 10px;
    border-bottom: 1px solid rgba(245,243,239,0.12);
  }
  .skyline-signup .gender-option { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .skyline-signup .gender-option input { display: none; }
  .skyline-signup .gender-dot {
    width: 14px; height: 14px; border: 1px solid rgba(201,168,76,0.35);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .skyline-signup .gender-option input:checked ~ .gender-dot { border-color: var(--gold); background: var(--gold); }
  .skyline-signup .gender-option input:checked ~ .gender-dot::after {
    content: ''; display: block; width: 5px; height: 5px;
    background: var(--navy); border-radius: 50%;
  }
  .skyline-signup .gender-label { font-size: 12px; color: var(--muted); font-weight: 300; letter-spacing: 0.3px; }

  .skyline-signup .social-section { margin-bottom: 22px; animation: fadeUp 0.8s 0.65s both; }
  .skyline-signup .social-label {
    font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 10px; display: block;
  }
  .skyline-signup .social-btns { display: flex; gap: 10px; }
  .skyline-signup .btn-social {
    flex: 1; padding: 10px; background: transparent;
    border: 1px solid rgba(245,243,239,0.1); color: var(--muted);
    font-family: 'Montserrat', sans-serif; font-size: 10px;
    letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.25s;
  }
  .skyline-signup .btn-social:hover { border-color: rgba(201,168,76,0.3); color: var(--gold-light); background: rgba(201,168,76,0.04); }

  .skyline-signup .btn-submit {
    width: 100%; padding: 12px;
    background: linear-gradient(135deg, var(--gold) 0%, #a8782e 100%);
    border: none; color: var(--navy);
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.3s;
    animation: fadeUp 0.8s 0.75s both; margin-bottom: 12px;
  }
  .skyline-signup .btn-submit::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold-light), var(--gold));
    opacity: 0; transition: opacity 0.3s;
  }
  .skyline-signup .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.3); }
  .skyline-signup .btn-submit:hover::before { opacity: 1; }
  .skyline-signup .btn-submit span { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 10px; }

  .skyline-signup .signin-prompt {
    text-align: center; font-size: 11px;
    color: rgba(245,243,239,0.25); letter-spacing: 0.3px;
    animation: fadeUp 0.8s 0.85s both;
  }
  .skyline-signup .signin-prompt a { color: var(--sky); text-decoration: none; font-weight: 500; transition: color 0.2s; }
  .skyline-signup .signin-prompt a:hover { color: var(--gold-light); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 700px) {
    .skyline-signup .panel-left { display: none; }
    .skyline-signup .panel-right { padding: 28px 20px; }
    .skyline-signup .fields-grid { grid-template-columns: 1fr; }
    .skyline-signup .field-full { grid-column: 1; }
    .skyline-signup .card-wrap { width: 100%; min-height: auto; max-height: none; border-radius: 6px; }
  }
`;

export default function Signup({ history }) {
  const [newUser, setnewUser] = useState({});

  const handleChangeEvent = (e, field) => {
    setnewUser({ ...newUser, [field]: e.target.value });
  };

  const getToSignIn = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const submitData = (e) => {
    e.preventDefault();
    signupFunc.registerUser(newUser).then((response) => response.data);
    history.push("/login");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="skyline-signup" style={{ "--bg-url": `url(${bgImage})` }}>
        {/* Layer 1: photo + side-fade via ::after pseudo */}
        <div className="bg-image" />

        {/* Layer 2: top/bottom vignette */}
        <div className="bg-vignette" />

        {/* Stars */}
        <div className="stars" />

        {/* Animated flight path */}
        <div className="flight-path">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
            <path className="path-line" d="M-100,750 Q300,400 700,300 Q1000,220 1540,150" />
          </svg>
        </div>

        {/* Floating plane */}
        <div className="plane-decor">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#c9a84c" strokeWidth="1">
            <path d="M 10 50 L 90 30 L 80 50 L 90 70 Z" strokeLinejoin="round" />
            <path d="M 40 50 L 55 20 L 65 50" />
            <path d="M 50 50 L 60 70 L 68 50" />
          </svg>
        </div>

        <div className="card-wrap">
          {/* Left Panel */}
          <div className="panel-left">
            <div className="brand">
              <div className="brand-name">
                Dinesh <span>SkyLines</span>
              </div>
              <div className="tagline">Elevating every journey</div>
            </div>
            <div className="left-steps">
              <div className="step-row">
                <div className="step-num">1</div>
                <div className="step-info">
                  <div className="step-name">Create Account</div>
                  <div className="step-desc">Fill in your personal details to get started</div>
                </div>
              </div>
              <div className="step-row">
                <div className="step-num">2</div>
                <div className="step-info">
                  <div className="step-name">Verify Identity</div>
                  <div className="step-desc">Quick email verification for security</div>
                </div>
              </div>
              <div className="step-row">
                <div className="step-num">3</div>
                <div className="step-info">
                  <div className="step-name">Start Flying</div>
                  <div className="step-desc">Book flights, manage trips & more</div>
                </div>
              </div>
            </div>
            <div className="left-footer">© 2025 Dinesh SkyLines</div>
          </div>

          {/* Right Form Panel */}
          <div className="panel-right">
            <div className="form-heading">
              <div className="form-title">
                Create your
                <br />
                account.
              </div>
              <div className="form-subtitle">Join the SkyLine family today</div>
            </div>

            <div className="social-section">
              <span className="social-label">Quick sign up with</span>
              <div className="social-btns">
                <button type="button" className="btn-social">
                  <FaFacebookF size={13} /> Facebook
                </button>
                <button type="button" className="btn-social">
                  <FaTwitterSquare size={13} /> Twitter
                </button>
              </div>
            </div>

            <form onSubmit={submitData}>
              <div className="fields-grid">
                <div className="field">
                  <label className="field-label">Full Name</label>
                  <input className="field-input" type="text" placeholder="John Doe" onChange={(e) => handleChangeEvent(e, "name")} />
                  <div className="field-line" />
                </div>
                <div className="field">
                  <label className="field-label">Mobile No.</label>
                  <input required className="field-input" type="text" placeholder="+91 00000 00000" onChange={(e) => handleChangeEvent(e, "mobile")} />
                  <div className="field-line" />
                </div>
                <div className="field field-full">
                  <label className="field-label">Email Address</label>
                  <input required className="field-input" type="email" placeholder="passenger@skyline.aero" onChange={(e) => handleChangeEvent(e, "email")} />
                  <div className="field-line" />
                </div>
                <div className="field field-full">
                  <label className="field-label">Gender</label>
                  <div className="gender-row">
                    <label className="gender-option">
                      <input required type="radio" name="gender" value="Male" onChange={(e) => handleChangeEvent(e, "gender")} />
                      <div className="gender-dot" />
                      <span className="gender-label">Male</span>
                    </label>
                    <label className="gender-option">
                      <input required type="radio" name="gender" value="Female" onChange={(e) => handleChangeEvent(e, "gender")} />
                      <div className="gender-dot" />
                      <span className="gender-label">Female</span>
                    </label>
                  </div>
                </div>
                <div className="field field-full">
                  <label className="field-label">Password</label>
                  <input required className="field-input" type="password" placeholder="••••••••••" onChange={(e) => handleChangeEvent(e, "password")} />
                  <div className="field-line" />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Create Account
                </span>
              </button>
            </form>

            <div className="signin-prompt">
              Already have an account?{" "}
              <a href="/#" onClick={getToSignIn}>
                Sign In →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
