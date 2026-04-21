import React, { useState } from "react";
import "./Routeselector.css";
import * as apiCall from "./routeApifunc";
import BusList from "../BusList/BusList";
import { showError, showSuccess, showInfo } from "../ToastProvider/Toast.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBookingStore from "../../stores/BookingStore";
export default function Routeselector({ onBookingComplete }) {
  const [dataInp, setData] = useState("");
  // const [startCity, setStartCity] = useState("");
  // const [date, setDate] = useState("");
  // const [destination, setDestination] = useState("");

  const { startCity, setStartCity, destination, setDestination, date, setDate, setBusData, setActiveTab } = useBookingStore();

  const renderBusList = (dataInp) => {
    if (Object.keys(dataInp).length > 0) {
      return <BusList value={dataInp} onBookingComplete={onBookingComplete} />;
    }
  };
  const handleFromCity = (e) => {
    setStartCity(e.target.value);
    localStorage.setItem("start", e.target.value);
  };

  const handleToCity = (e) => {
    setDestination(e.target.value);
    localStorage.setItem("destination", e.target.value);
  };

  const getRoutes = (e) => {
    e.preventDefault();
    if (!startCity || startCity === "FROM") {
      showError("Please select Arrival");
      return;
    }
    if (!destination || destination === "TO") {
      showError("Please select Destination");
      return;
    }
    if (!date || date === "") {
      showError("Please select Date");
      return;
    }
    if (startCity === destination) {
      showError("Arrival and destination cannot be the same");
      return;
    }
    apiCall
      .getRoutesFromApi(startCity, destination)
      .then((response) => response.data)
      .then((data) => {
        setData(data.bus);
        if (!data.bus || data.bus.length === 0) {
          showInfo("No Flights found for the selected route!");
        }
      })
      .catch(() => {
        showError("Error fetching Flights. Please try again!");
      });
  };

  const handleDate = (e) => {
    e.preventDefault();
    setDate(e.target.value);
    localStorage.setItem("date", e.target.value);
  };

  return (
    <div className="rdc">
      <div className="form-group inline"></div>
      <div className="main-container">
        <ToastContainer />
        <form className="form-inline" onSubmit={(e) => getRoutes(e)}>
          <select
            name="ad_account_selected"
            data-style="btn-new"
            class="selectpicker"
            onChange={(e) => {
              handleFromCity(e);
            }}
          >
            <option>FROM</option>
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Coimbatore</option>
            <option>Goa</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Trivandram</option>
            <option>Madurai</option>
            <option>Cochin</option>
            <option>Pune</option>
            <option>Hyderabad</option>
            <option>Dehradun</option>
            <option>Jaipur</option>
            <option>Varanasi</option>
            <option>Patna</option>
            <option>Agra</option>
            <option>Kanpur</option>
            <option>Lucknow</option>
            <option>Indore</option>
            <option>Nagpur</option>
            <option>Vadodara</option>
            <option>Thane</option>
            <option>Bhopal</option>
            <option>Surat</option>
            <option>Nashik</option>
          </select>
          <select
            name="ad_account_selected"
            data-style="btn-new"
            class="selectpicker"
            onChange={(e) => {
              handleToCity(e);
            }}
          >
            <option>TO</option>
            <option>Hyderabad</option>
            <option>Coimbatore</option>
            <option>Vishakapatnam</option>
            <option>Bangalore</option>
            <option>Chenai</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Trivandram</option>
            <option>Madurai</option>
            <option>Cochin</option>
            <option>Pune</option>
            <option>Dehradun</option>
            <option>Jaipur</option>
            <option>Varanasi</option>
            <option>Patna</option>
            <option>Agra</option>
            <option>Kanpur</option>
            <option>Lucknow</option>
            <option>Indore</option>
            <option>Nagpur</option>
            <option>Vadodara</option>
            <option>Thane</option>
            <option>Bhopal</option>
            <option>Surat</option>
            <option>Nashik</option>
          </select>
          <input
            onChange={(e) => {
              handleDate(e);
            }}
            type="date"
          ></input>
          {/* <input type="submit" className=" btn btn-primary btn-md getRoute" /> */}
          <button type="submit" className="btn btn-primary btn-md getRoute">
            {"Search Flights"}
          </button>
        </form>

        <div>{renderBusList(dataInp)}</div>
      </div>
    </div>
  );
}
