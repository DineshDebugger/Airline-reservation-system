// import React, { useState } from 'react'
// import './Routeselector.css'
// import * as apiCall from './routeApifunc'
// import BusList from '../BusList/BusList'
// export default function Routeselector() {
//     const [dataInp, setData] = useState("")
//     const [startCity, setStartCity] = useState('')
//     const [destination, setDestination] = useState('')
//     const handleToCity = e => {
//         e.preventDefault()
//         setDestination({ destination: e.target.value })
//         localStorage.setItem("destination", e.target.value)
//     }
//     const renderBusList = (dataInp) => {
//         if (Object.keys(dataInp).length > 0) {
//             return (<BusList value={dataInp} />)
//         }
//     }
//     const handleFromCity = e => {
//         e.preventDefault()
//         setStartCity({ startCity: e.target.value })
//         localStorage.setItem("start", e.target.value)
//         // console.log(startCity)
//     }

//     const getRoutes = e => {
//         e.preventDefault()
//         // console.log(startCity,destination)
//         apiCall.getRoutesFromApi(startCity.startCity, destination.destination)
//             .then(response => response.data)
//             .then(data => {
//                 setData(data.bus)
//             })
//     }

//     const handleDate = e => {
//         e.preventDefault()
//         //    console.log(e.target.value)
//         localStorage.setItem("date", e.target.value)
//     }
    
//     return (
//         <div className="rdc">
//             <div className="form-group inline"></div>
//             <div className="main-container">
//                 <form className="form-inline" onSubmit={e => getRoutes(e)}>
//                     <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
//                         <option>FROM</option>
//                         <option>Chennai</option>
//                         <option>Bangalore</option>
//                         <option>Coimbatore</option>
//                         <option>Goa</option>
//                         <option>Delhi</option>
//                         <option>Mumbai</option>
//                         <option>Kolkata</option>
//                         <option>Trivandram</option>
//                         <option>Madurai</option>
//                         <option>Cochin</option>
//                         <option>Pune</option>
//                         <option>Hyderabad</option>
//                         <option>Dehradun</option>
//                         <option>Jaipur</option>
//                         <option>Varanasi</option>
//                         <option>Patna</option>
//                         <option>Agra</option>
//                         <option>Kanpur</option>
//                         <option>Lucknow</option>
//                         <option>Indore</option>
//                         <option>Nagpur</option>
//                         <option>Vadodara</option>
//                         <option>Thane</option>
//                         <option>Bhopal</option>
//                         <option>Surat</option>                        
//                         <option>Nashik</option>


//                     </select>
//                     <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }}>
//                         <option>TO</option>
//                         <option>Hyderabad</option>
//                         <option>Coimbatore</option>
//                         <option>Vishakapatnam</option>
//                         <option>Bangalore</option>
//                         <option>Chenai</option>
//                         <option>Delhi</option>
//                         <option>Mumbai</option>
//                         <option>Kolkata</option>
//                         <option>Trivandram</option>
//                         <option>Madurai</option>
//                         <option>Cochin</option>
//                         <option>Pune</option>                        
//                         <option>Dehradun</option>
//                         <option>Jaipur</option>
//                         <option>Varanasi</option>
//                         <option>Patna</option>
//                         <option>Agra</option>
//                         <option>Kanpur</option>
//                         <option>Lucknow</option>
//                         <option>Indore</option>
//                         <option>Nagpur</option>
//                         <option>Vadodara</option>
//                         <option>Thane</option>
//                         <option>Bhopal</option>
//                         <option>Surat</option>                        
//                         <option>Nashik</option>
//                     </select>
//                     <input onChange={e => { handleDate(e) }} type="date"></input>
//                     <input type="submit" className=" btn btn-primary btn-md getRoute" />
//                 </form>

//                 <div>
//                     {renderBusList(dataInp)}
//                 </div>
//             </div>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';
import './Routeselector.css';
import * as apiCall from './routeApifunc';
import BusList from '../BusList/BusList';

// Constants for city options to avoid duplication
const CITIES = [
  'Chennai', 'Bangalore', 'Coimbatore', 'Goa', 'Delhi', 'Mumbai',
  'Kolkata', 'Trivandram', 'Madurai', 'Cochin', 'Pune', 'Hyderabad',
  'Dehradun', 'Jaipur', 'Varanasi', 'Patna', 'Agra', 'Kanpur',
  'Lucknow', 'Indore', 'Nagpur', 'Vadodara', 'Thane', 'Bhopal',
  'Surat', 'Nashik', 'Vishakapatnam'
];

export default function Routeselector({ onFlightSelect }) {
  const [formData, setFormData] = useState({
    startCity: '',
    destination: '',
    date: ''
  });
  const [busData, setBusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Store in localStorage if needed
    if (name === 'startCity' || name === 'destination') {
      localStorage.setItem(name, value);
    }
  };

  // Fetch routes from API
  const getRoutes = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.startCity || !formData.destination) {
      setError('Please select both departure and arrival cities');
      return;
    }
    
    if (formData.startCity === formData.destination) {
      setError('Departure and arrival cities cannot be the same');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall.getRoutesFromApi(
        formData.startCity, 
        formData.destination
      );
      
      setBusData(response.data.bus);
      
      // Notify parent component about flight selection
      if (onFlightSelect && response.data.bus.length > 0) {
        onFlightSelect(response.data.bus[0]); // Or let user select from list
      }
    } catch (err) {
      setError('Failed to fetch routes. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render city options
  const renderCityOptions = () => (
    CITIES.map(city => (
      <option key={city} value={city}>{city}</option>
    ))
  );

  return (
    <div className="rdc">
      <div className="main-container">
        <form className="form-inline" onSubmit={getRoutes}>
          {/* Departure City */}
          <select 
            name="startCity"
            className="selectpicker"
            value={formData.startCity}
            onChange={handleInputChange}
            required
          >
            <option value="">FROM</option>
            {renderCityOptions()}
          </select>

          {/* Arrival City */}
          <select 
            name="destination"
            className="selectpicker"
            value={formData.destination}
            onChange={handleInputChange}
            required
          >
            <option value="">TO</option>
            {renderCityOptions()}
          </select>

          {/* Date Picker */}
          <input 
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]} // Disable past dates
            required
          />

          <button 
            type="submit" 
            className="btn btn-primary btn-md getRoute"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search Routes'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="mt-3 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-4">
          {busData && <BusList value={busData} />}
        </div>
      </div>
    </div>
  );
}