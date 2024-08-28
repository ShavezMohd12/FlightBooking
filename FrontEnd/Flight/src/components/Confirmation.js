import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../confirmation.module.css'; 
import Login from './Login';

function Confirmation() {
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook to access location state
    var ID, Uname;

    // Function to handle navigation to a specific path
    const handleNavigation = (path) => {
        navigate(path, { state: { id: ID, uname: Uname } });
    };

    // If the user is not logged in, redirect to the Login page
    if (location.state == null) {
        return (
            <>
                {alert("User Not Verified")}
                <Login />
            </>
        );
    } else {
        // Retrieve user details from location state
        ID = location.state.id;
        Uname = location.state.uname;
        console.log(Uname);

        // Render the confirmation page
        return (
            <div className={styles.confirmationContainer}>
                <div className={styles.confirmationBox}>
            
                    <img src="/success.png" alt="Success" className={styles.successIcon} />
                    
                    <h1 className={styles.successMessage}>Payment Successful!</h1>
                    <p>Your payment has been processed successfully.</p>
            
                    <button onClick={() => handleNavigation('/flightbooking')} className={styles.confirmationButton}>
                        Book Another Flight
                    </button>
                </div>
            </div>
        );
    }
}

export default Confirmation;
