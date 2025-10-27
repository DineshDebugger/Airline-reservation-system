import React from "react";
import RouteSelector from "../routeSelector/Routeselector";
import SeatSelection from "../SeatSelection/SeatSelection";
import PaymentTab from "../PaymentTab/PaymentTab";
import CancelTicket from "../CancelTicket/CancelTicket";
import AdditionalServices from "../AdditionalServices/AdditionalServices";
import TravelHistory from "../TravelHistory/TravelHistory";
import Gallery from "../../portfolio-gallery/Gallery";
import ChangingFeatures from "../ChangingFeatures/ChangingFeatures";
import CustomerService from "../CustomerService/CustomerService";

export default function RouteSelection({ history }) {
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

  return (
    <div className="container">
      <div>
        <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
          {/* <a href="/#" className="navbar-brand Company-Log" onClick={(e) => handleLogoClick(e)}>
            <div class="logo-container">
              <div class="hero-banner"></div>
            </div>
          </a> */}
          <img src={require("../../../src/assets/logo1.jpg")} alt="Dinesh Airways Logo" className="logo" />
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
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleUserIcon(e)}
                >
                  <i className="fa fa-user user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/#"
                  className="nav-link waves-effect waves-light"
                  onClick={(e) => handleSignOut(e)}
                >
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
            <a className="nav-link active" data-toggle="pill" href="#home">
              Ticket Booking
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link "
              data-toggle="pill"
              href="#menu1"
              style={{ color: "floralwhite" }}
            >
              Seat Selection
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu2"
              style={{ color: "floralwhite" }}
            >
              Payment
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu3"
              style={{ color: "floralwhite" }}
            >
              Ticket Cancellation
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu4"
              style={{ color: "floralwhite" }}
            >
              Travel History
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu5"
              style={{ color: "floralwhite" }}
            >
              Flight Status
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu6"
              style={{ color: "floralwhite" }}
            >
              Additional Services
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu8"
              style={{ color: "floralwhite" }}
            >
              Customer Service
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="pill"
              href="#menu7"
              style={{ color: "floralwhite" }}
            >
              Changing Features
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane container active mn-box" id="home">
            <RouteSelector />
          </div>
          <div className="tab-pane container fade mn-box" id="menu1">
            <SeatSelection />
          </div>
          <div className="tab-pane container fade mn-box" id="menu2">
            <PaymentTab />
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
          <div className="tab-pane container fade mn-box" id="menu6">
            <AdditionalServices />
          </div>
          <div className="tab-pane container fade mn-box" id="menu7">
            <ChangingFeatures />
          </div>
          <div className="tab-pane container fade mn-box" id="menu8">
            <CustomerService />
          </div>
        </div>
      </div>
    </div>
  );
}
