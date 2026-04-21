import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ history }) => {
  const [bookingsData, setBookingsData] = useState([
    { id: "BK001", passenger: "Rajesh Kumar", flight: "AI 502", route: "DEL → BOM", date: "2025-11-05", seat: "12A", amount: 5500, status: "confirmed" },
    { id: "BK002", passenger: "Priya Sharma", flight: "EK 615", route: "BOM → DXB", date: "2025-11-06", seat: "8C", amount: 18500, status: "confirmed" },
    { id: "BK003", passenger: "Amit Patel", flight: "QR 472", route: "BLR → DOH", date: "2025-11-04", seat: "15B", amount: 22000, status: "cancelled" },
    { id: "BK004", passenger: "Sneha Iyer", flight: "LH 754", route: "DEL → FRA", date: "2025-11-08", seat: "5D", amount: 45000, status: "confirmed" },
    { id: "BK005", passenger: "Vikram Singh", flight: "AI 680", route: "CCU → DEL", date: "2025-11-03", seat: "9A", amount: 4200, status: "pending" },
    { id: "BK006", passenger: "Ananya Das", flight: "EK 509", route: "HYD → DXB", date: "2025-11-07", seat: "22F", amount: 19800, status: "confirmed" },
    { id: "BK007", passenger: "Karthik Reddy", flight: "AI 144", route: "BLR → BOM", date: "2025-11-05", seat: "11C", amount: 3800, status: "cancelled" },
    { id: "BK008", passenger: "Meera Nair", flight: "QR 561", route: "DEL → DOH", date: "2025-11-09", seat: "7B", amount: 24500, status: "confirmed" },
  ]);

  const [currentBookings, setCurrentBookings] = useState([...bookingsData]);
  const [currentTab, setCurrentTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAirline, setFilterAirline] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

  // Form states for adding flight
  const [newFlight, setNewFlight] = useState({
    airline: "",
    flightNumber: "",
    from: "",
    to: "",
    price: "",
  });

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterAirline, filterDate, currentTab, bookingsData]);

  const switchTab = (tab) => {
    setCurrentTab(tab);
  };

  const applyFilters = () => {
    let filtered = currentTab === "all" ? [...bookingsData] : bookingsData.filter((b) => b.status === currentTab);

    if (searchTerm) {
      filtered = filtered.filter((b) => b.id.toLowerCase().includes(searchTerm.toLowerCase()) || b.passenger.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterAirline) {
      // Convert full airline name back to code for filtering
      const airlineCodes = {
        'Air India': 'AI',
        'Emirates': 'EK',
        'Qatar Airways': 'QR',
        'Lufthansa': 'LH',
        'United Airlines': 'UA',
        'British Airways': 'BA',
        'Air France': 'AF',
        'KLM Royal Dutch Airlines': 'KL'
      };
      const airlineCode = airlineCodes[filterAirline] || filterAirline;
      filtered = filtered.filter((b) => b.flight.toLowerCase().startsWith(airlineCode.toLowerCase()));
    }

    setCurrentBookings(filtered);
  };

  const handleEdit = (id) => {
    const booking = bookingsData.find((b) => b.id === id);
    if (booking) {
      setEditBooking({ ...booking });
      setEditModalOpen(true);
    }
  };

  const saveEdit = () => {
    const updatedBookings = bookingsData.map((b) => (b.id === editBooking.id ? editBooking : b));
    setBookingsData(updatedBookings);
    setEditModalOpen(false);
    alert("Booking updated successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const updatedBookings = bookingsData.filter((b) => b.id !== id);
      setBookingsData(updatedBookings);
      alert("Booking deleted successfully!");
    }
  };

  const handleAddFlight = () => {
    // Validate required fields
    if (!newFlight.airline || !newFlight.flightNumber || !newFlight.from || !newFlight.to || !newFlight.price) {
      alert("Please fill in all fields!");
      return;
    }

    // Generate new booking ID
    const newId = `BK${String(bookingsData.length + 1).padStart(3, '0')}`;

    // Create new booking entry from flight data
    const newBooking = {
      id: newId,
      passenger: "New Flight Booking",
      flight: `${newFlight.airline} ${newFlight.flightNumber}`,
      route: `${newFlight.from} → ${newFlight.to}`,
      date: new Date().toISOString().split('T')[0], // Today's date
      seat: "TBD", // To Be Determined
      amount: parseInt(newFlight.price),
      status: "pending"
    };

    // Add to bookings data
    // setBookingsData(prevData => [...prevData, newBooking]);

    alert("New flight added successfully!");
    setAddModalOpen(false);
    setNewFlight({ airline: "", flightNumber: "", from: "", to: "", price: "" });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem("authToken");
      localStorage.removeItem("reservedSeats");
      localStorage.removeItem("nameData");
      localStorage.clear();
      history.push("/");
      alert("Logged out successfully!");
    }
  };

  const handleReturnToBooking = () => {
    history.push("/routes");
  };

  // Calculate stats
  const totalBookings = bookingsData.length;
  const activeFlights = 45;
  const cancelledTickets = bookingsData.filter((b) => b.status === "cancelled").length;
  const revenue = (bookingsData.reduce((sum, b) => sum + b.amount, 0) / 100000).toFixed(1);

  // Get unique airlines from bookings data with full names
  const getUniqueAirlines = () => {
    // Airline code to full name mapping
    const airlineNames = {
      'AI': 'Air India',
      'EK': 'Emirates',
      'QR': 'Qatar Airways',
      'LH': 'Lufthansa',
      'UA': 'United Airlines',
      'BA': 'British Airways',
      'AF': 'Air France',
      'KL': 'KLM Royal Dutch Airlines'
    };

    const airlines = bookingsData.map(booking => {
      // Extract airline code from flight (e.g., "AI 502" -> "AI")
      const flightParts = booking.flight.split(' ');
      const airlineCode = flightParts[0];
      // Return full name if available, otherwise return the code
      return airlineNames[airlineCode] || airlineCode;
    });

    return [...new Set(airlines)]; // Remove duplicates
  };

  const uniqueAirlines = getUniqueAirlines();

  return (
    <div className="admin-dashboard-wrapper">
      <div className="dashboard-container">
        {/* Header */}
        {/* <div className="header">
          <h1>✈️ Admin Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div>
              <div style={{ fontWeight: 600 }}>Admin User</div>
              <div style={{ fontSize: "12px", color: "#666" }}>admin@airline.com</div>
            </div>
            <button className="btn btn-danger btn-small" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div> */}

  <div className="header">
  <div className="header-brand">
    <div className="header-icon-box">✈️</div>
    <div>
      <h1>Admin Dashboard</h1>
      <div className="header-tagline">Flight Booking System</div>
    </div>
  </div>
  <div className="user-info">
    <div className="user-avatar">AD</div>
    <div className="user-details">
      <span className="user-name">Admin User</span>
      <span className="user-email">admin@airline.com</span>
    </div>
    <button className="btn btn-primary btn-small" onClick={handleReturnToBooking}>Return to Booking</button>
    <button className="btn btn-danger btn-small" onClick={handleLogout}>Logout</button>
  </div>
</div>  

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <div className="stat-value">{totalBookings}</div>
            <div className="stat-change">↑ 12% from last month</div>
          </div>
          <div className="stat-card">
            <h3>Active Flights</h3>
            <div className="stat-value">{activeFlights}</div>
            <div className="stat-change">↑ 5% from last month</div>
          </div>
          <div className="stat-card">
            <h3>Cancelled Tickets</h3>
            <div className="stat-value">{cancelledTickets}</div>
            <div className="stat-change negative">↑ 3% from last month</div>
          </div>
          <div className="stat-card">
            <h3>Revenue (₹)</h3>
            <div className="stat-value">{revenue}L</div>
            <div className="stat-change">↑ 18% from last month</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Manage Bookings</h2>
              <button className="btn btn-primary" onClick={() => setAddModalOpen(true)}>
                + Add New Flight
              </button>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button className={`tab ${currentTab === "all" ? "active" : ""}`} onClick={() => switchTab("all")}>
                All Bookings
              </button>
              <button className={`tab ${currentTab === "confirmed" ? "active" : ""}`} onClick={() => switchTab("confirmed")}>
                Confirmed
              </button>
              <button className={`tab ${currentTab === "cancelled" ? "active" : ""}`} onClick={() => switchTab("cancelled")}>
                Cancelled
              </button>
              <button className={`tab ${currentTab === "pending" ? "active" : ""}`} onClick={() => switchTab("pending")}>
                Pending
              </button>
            </div>

            {/* Search and Filter */}
            <div className="search-filter">
              <input
                type="text"
                className="search-input"
                placeholder="Search by booking ID, passenger name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select className="filter-select" value={filterAirline} onChange={(e) => setFilterAirline(e.target.value)}>
                <option value="">All Airlines</option>
                {uniqueAirlines.map(airline => (
                  <option key={airline} value={airline}>{airline}</option>
                ))}
              </select>
              <select className="filter-select" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Bookings Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Passenger Name</th>
                    <th>Flight</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Seat</th>
                    <th>Amount (₹)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.id}</strong>
                      </td>
                      <td>{booking.passenger}</td>
                      <td>{booking.flight}</td>
                      <td>{booking.route}</td>
                      <td>{booking.date}</td>
                      <td>{booking.seat}</td>
                      <td>₹{booking.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status status-${booking.status}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-edit btn-small" onClick={() => handleEdit(booking.id)}>
                            Edit
                          </button>
                          <button className="btn btn-danger btn-small" onClick={() => handleDelete(booking.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <div className="modal active">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Edit Booking</h3>
              </div>
              <div className="form-group">
                <label  className="form-label" style={{ top: '-26px' }}>Booking ID</label>
                <input style={{ marginLeft: '8px' }} type="text" className="form-input" value={editBooking.id} readOnly />
              </div>
              <div className="form-group">
                <label  className="form-label" style={{ top: '-26px' }}>Passenger Name</label>
                <input
                  style={{ marginLeft: '8px' }}
                  type="text"
                  className="form-input"
                  value={editBooking.passenger}
                  onChange={(e) => setEditBooking({ ...editBooking, passenger: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ top: '-26px' }}>Status</label>
                <select className="form-input" value={editBooking.status} onChange={(e) => setEditBooking({ ...editBooking, status: e.target.value })}>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={saveEdit}>
                  Save Changes
                </button>
                <button className="btn" style={{ background: "#e5e7eb" }} onClick={() => setEditModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Flight Modal */}
        {addModalOpen && (
          <div className="modal active">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Add New Flight</h3>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ top: '-26px' }}>Airline Name</label>
                <input type="text" className="form-input" style={{ marginLeft: '8px' }} value={newFlight.airline} onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ top: '-26px' }}>Flight Number</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ marginLeft: '8px' }}
                  value={newFlight.flightNumber}
                  onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ top: '-26px' }}>From</label>
                <input type="text" className="form-input" style={{ marginLeft: '8px' }} value={newFlight.from} onChange={(e) => setNewFlight({ ...newFlight, from: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ top: '-26px' }}>To</label>
                <input type="text" className="form-input" style={{ marginLeft: '8px' }} value={newFlight.to} onChange={(e) => setNewFlight({ ...newFlight, to: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ top: '-26px' }}>Price per Seat (₹)</label>
                <input type="number" className="form-input" style={{ marginLeft: '8px' }} value={newFlight.price} onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button className="btn btn-success" onClick={handleAddFlight}>
                  Add Flight
                </button>
                <button className="btn" style={{ background: "#e5e7eb" }} onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
