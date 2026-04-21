import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import RouteSelector from "../routeSelector/Routeselector";
import SeatSelection from "../SeatSelection/SeatSelection";
import PaymentTab from "../PaymentTab/PaymentTab";
import CancelTicket from "../CancelTicket/CancelTicket";
import AdditionalServices from "../AdditionalServices/AdditionalServices";
import TravelHistory from "../TravelHistory/TravelHistory";
import Gallery from "../../portfolio-gallery/Gallery";
import ChangingFeatures from "../ChangingFeatures/ChangingFeatures";
import CustomerService from "../CustomerService/CustomerService";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

export default function RouteSelection({ history }) {
  const [userRole, setUserRole] = useState("");
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [seatSelectionCompleted, setSeatSelectionCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        const decoded = jwt_decode(token);
        console.log("Decoded token:", decoded); // Debug
        const email = decoded.doc?.email || "";
        const isAdmin = email.includes("admin");
        console.log("User email:", email, "Is admin:", isAdmin); // Debug
        setUserRole(isAdmin ? "admin" : "");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);
  const handleUserIcon = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("reservedSeats");
    localStorage.removeItem("nameData");
    localStorage.clear();
    history.push("/");
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    history.push("/routes");
  };

  const handleAdminDashboard = (e) => {
    e.preventDefault();
    history.push("/admin/dashboard");
  };

  const handleTabClick = (e, tabName, isEnabled, tabId) => {
    if (!isEnabled) {
      e.preventDefault();
      alert(`Please complete the previous steps first. ${tabName} will be available once you finish.`);
      return;
    }
    setActiveTab(tabId);
  };

  return (
    <div className="container">
      <div>
        <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
          <a href="/#" className="navbar-brand Company-Log" onClick={(e) => handleLogoClick(e)}>
            Dinesh Airways
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-3"
            aria-controls="navbarSupportedContent-3"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
            <ul className="navbar-nav ml-auto nav-flex-icons ic">
              <li className="nav-item">
                <a href="/#" className="nav-link waves-effect waves-light" onClick={(e) => handleUserIcon(e)}>
                  <i className="fa fa-user user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="/#" className="nav-link waves-effect waves-light" onClick={(e) => handleSignOut(e)}>
                  Sign-Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a 
              className="nav-link active" 
              data-toggle="pill" 
              href="#home"
              onClick={() => setActiveTab("home")}
              style={{
                background: activeTab === "home" ? "#1a73e8" : "transparent",
                color: activeTab === "home" ? "#ffffff" : "#2c3e50",
                borderBottom: "2px solid transparent"
              }}
            >
              Ticket Booking
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${bookingCompleted ? "" : "disabled"}`}
              style={{
                cursor: bookingCompleted ? "pointer" : "not-allowed", 
                background: activeTab === "menu1" ? "#1a73e8" : "transparent",
                color: activeTab === "menu1" ? "#ffffff" : "#2c3e50",
                // borderBottom: bookingCompleted ? "2px solid transparent" : "2px dashed #2c3e50",
                opacity: bookingCompleted ? 1 : 0.45,
                pointerEvents: bookingCompleted ? "auto" : "none"
              }}
              onClick={(e) => handleTabClick(e, "Seat Selection", bookingCompleted, "menu1")}
              data-toggle={bookingCompleted ? "pill" : ""}
              href={bookingCompleted ? "#menu1" : "#"}
            >
              Seat Selection
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${seatSelectionCompleted ? "" : "disabled"}`}
              style={{
                cursor: seatSelectionCompleted ? "pointer" : "not-allowed",
                background: activeTab === "menu2" ? "#1a73e8" : "transparent",
                color: activeTab === "menu2" ? "#ffffff" : "#2c3e50",
                // borderBottom: seatSelectionCompleted ? "2px solid transparent" : "2px dashed #2c3e50",
                opacity: seatSelectionCompleted ? 1 : 0.45,
                pointerEvents: seatSelectionCompleted ? "auto" : "none"
              }}
              onClick={(e) => handleTabClick(e, "Payment", seatSelectionCompleted, "menu2")}
              data-toggle={seatSelectionCompleted ? "pill" : ""}
              href={seatSelectionCompleted ? "#menu2" : "#"}
            >
              Payment
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${paymentCompleted ? "" : "disabled"}`}
              style={{
                cursor: paymentCompleted ? "pointer" : "not-allowed",
                background: activeTab === "menu3" ? "#1a73e8" : "transparent",
                color: activeTab === "menu3" ? "#ffffff" : "#2c3e50",
                // borderBottom: paymentCompleted ? "2px solid transparent" : "2px dashed #2c3e50",
                opacity: paymentCompleted ? 1 : 0.45,
                pointerEvents: paymentCompleted ? "auto" : "none"
              }}
              onClick={(e) => handleTabClick(e, "Ticket Cancellation", paymentCompleted, "menu3")}
              data-toggle={paymentCompleted ? "pill" : ""}
              href={paymentCompleted ? "#menu3" : "#"}
            >
              Ticket Cancellation
            </a>
          </li>
          <li className="nav-item">
            <a 
              className="nav-link" 
              data-toggle="pill" 
              href="#menu4"
              onClick={() => setActiveTab("menu4")}
              style={{
                background: activeTab === "menu4" ? "#1a73e8" : "transparent",
                color: activeTab === "menu4" ? "#ffffff" : "#2c3e50",
                borderBottom: "2px solid transparent"
              }}
            >
              Travel History
            </a>
          </li>
          <li className="nav-item">
            <a 
              className="nav-link" 
              data-toggle="pill" 
              href="#menu5"
              onClick={() => setActiveTab("menu5")}
              style={{
                background: activeTab === "menu5" ? "#1a73e8" : "transparent",
                color: activeTab === "menu5" ? "#ffffff" : "#2c3e50",
                borderBottom: "2px solid transparent"
              }}
            >
              Flight Status
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#menu6">
              Additional Services
            </a>
          </li> */}
          <li className="nav-item">
            <a 
              className="nav-link" 
              data-toggle="pill" 
              href="#menu8"
              onClick={() => setActiveTab("menu8")}
              style={{
                background: activeTab === "menu8" ? "#1a73e8" : "transparent",
                color: activeTab === "menu8" ? "#ffffff" : "#2c3e50",
                borderBottom: "2px solid transparent"
              }}
            >
              Customer Service
            </a>
          </li>
          {userRole === "admin" && (
            <li className="nav-item">
              <a 
                className="nav-link" 
                data-toggle="pill" 
                href="#menu9" 
                onClick={(e) => {
                  handleAdminDashboard(e);
                  setActiveTab("menu9");
                }}
                style={{
                  background: activeTab === "menu9" ? "#1a73e8" : "transparent",
                  color: activeTab === "menu9" ? "#ffffff" : "#2c3e50",
                  borderBottom: "2px solid transparent"
                }}
              >
                Admin Dashboard
              </a>
            </li>
          )}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#menu7">
              Changing Features
            </a>
          </li> */}
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active mn-box" id="home">
            <RouteSelector onBookingComplete={() => setBookingCompleted(true)} />
          </div>
          <div className="tab-pane container fade mn-box" id="menu1">
            <SeatSelection onSeatSelectionComplete={() => setSeatSelectionCompleted(true)} />
          </div>
          <div className="tab-pane container fade mn-box" id="menu2">
            <PaymentTab onPaymentComplete={() => setPaymentCompleted(true)} />
          </div>
          <div className="tab-pane container fade mn-box" id="menu3">
            <CancelTicket />
          </div>
          <div className="tab-pane container fade mn-box" id="menu4">
            <TravelHistory />
          </div>
          <div className="tab-pane container fade mn-box" id="menu5">
            <Gallery />
          </div>
          {/* <div className="tab-pane container fade mn-box" id="menu6">
            <AdditionalServices />
          </div> */}
          {/* <div className="tab-pane container fade mn-box" id="menu7">
            <ChangingFeatures />
          </div> */}
          <div className="tab-pane container fade mn-box" id="menu8">
            <CustomerService />
          </div>
          {userRole === "admin" && (
            <div className="tab-pane container fade mn-box" id="menu9">
              <AdminDashboard {...{ history }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
