import React, { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../managebookings.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ManageBookings() {
    const [Bookings, setBookings] = useState([]); // State to store bookings
    const [Error, setError] = useState(''); // State to store error messages
    const [EditBookingId, setEditBookingId] = useState(null); // State to track the booking being edited
    const [NewDate, setNewDate] = useState(''); // State to store the new date for editing a booking
    const [FlightNumber, setFlightNumber] = useState(); // State to store flight number of the booking being edited
    const [Price,setBookingPrice]=useState();
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook to access location state

    // Function to fetch all bookings for the user
    function readData() {
        const url = 'http://localhost:8081/getAllBooking/' + location.state.uname;
        axios.get(url)
            .then((response) => {
                setBookings(response.data); // Update state with bookings data
                
                setError(''); // Clear any previous error messages
            })
            .catch((error) => {
                setError("Error fetching bookings!"); // Set error message
                console.log(error);
            });
    }

    // Function to handle cancellation of a booking
    const handleCancelBooking = (bookingId) => {
        const url = "http://localhost:8081/cancelBooking/" + bookingId;
        axios.delete(url)
            .then(() => {
                setBookings(Bookings.filter(booking => booking.id !== bookingId)); // Remove cancelled booking from state
                readData(); // Refresh booking data
            })
            .catch((error) => {
                setError("Error cancelling booking!"); // Set error message
                console.log(error);
            });
    };

    // Function to handle initiation of editing a booking
    const handleEditBooking = (bookingId, bookingFlightNumber,booingPrice) => {
        setEditBookingId(bookingId); // Set the booking ID to be edited
        setFlightNumber(bookingFlightNumber); // Set the flight number for the booking being edited
        setBookingPrice(booingPrice);
    };

    // Function to save the edited booking details
    const handleSaveEdit = () => {
        const url = "http://localhost:8081/checkBYCondition?date=" + String(NewDate) + "&FlightNumber=" + FlightNumber+"&price="+Price;
        console.log(Price)
        axios.get(url).then((response) => {
            if (response.data === "exist") {
                setError(''); // Clear any previous error messages
                const url2 = "http://localhost:8081/editFlight/" + EditBookingId;
                axios.put(url2, {
                    flightDate: NewDate,
                    price:Price
                }).then((response) => {
                    if (response.data === "changed") {
                        alert("Booking date updated successfully!");
                        readData(); // Refresh booking data
                    }
                    else{
                        setError("No flight available for this date.")
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else if (response.data === "not exist") {
                setError("No flight available for this date."); // Set error message if no flight is available
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    // Mapping the bookings data to table rows
    const ItemList = Bookings.length > 0 ? Bookings.map((booking) => {
        return (
            <tr key={booking.id} style={{ textAlign: "center", fontSize: "20px" }}>
                <td style={{ width: "200px" }}>{booking.bookingId}</td>
                <td style={{ width: "200px" }}>{booking.flightNumber}</td>
                <td style={{ width: "200px" }}>{booking.airline}</td>
                <td style={{ width: "200px" }}>{booking.flightDate}</td>
                <td style={{ width: "200px" }}>{booking.status}</td>
                <td style={{ width: "200px" }}>{booking.price}</td>
                <td style={{ width: "250px", display: 'flex', justifyContent: 'space-around' }}>
                    <button 
                        className={styles.editButton} 
                        onClick={() => handleEditBooking(booking.bookingId, booking.flightNumber,booking.price)}
                    >
                        Edit
                    </button>
                    <button 
                        className={styles.deleteButton} 
                        onClick={() => handleCancelBooking(booking.bookingId)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }) : <tr><td colSpan="7" style={{ textAlign: "center" }}></td></tr>;

    // Render the Manage Bookings page
    return (
        <div className={styles.main}>
            <div className={styles.flightcontainer}>
                <div className={styles.bookingContainer}>
                    <h2>Manage Bookings</h2>
                    {EditBookingId && (
                        <div className={styles.editContainer}>
                            <label htmlFor="newDate" className={styles.label}>Change Date:</label>
                            <input 
                                id="newDate"
                                type="date" 
                                onChange={(e) => setNewDate(e.target.value)} 
                                required 
                                className={styles.dateInput}
                            />
                            <button className={styles.saveButton} onClick={handleSaveEdit}>Save</button>
                        </div>
                    )}
                    <button className={styles.bttn} onClick={() => navigate('/flightbooking', { state: { id: location.state.id, uname: location.state.uname } })}>Create New Booking</button>
                    <button className={styles.bttn2} onClick={readData}>Show My Bookings</button>
                    {Error && <span className={styles.error}>{Error}</span>}
                </div>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr style={{ textAlign: "center" }}>
                            <th>Booking Id</th>
                            <th>Flight Number</th>
                            <th>Airline</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ItemList}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ManageBookings;
