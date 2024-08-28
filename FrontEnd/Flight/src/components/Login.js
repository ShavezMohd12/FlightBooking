import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../login.module.css'; 
function Login() {
    const [user, setUser] = useState(""); // State to store the user response from the backend
    const [Username, setUsername] = useState(''); // State to store the username input
    const [Password, setPassword] = useState(''); // State to store the password input
    const [Error, setError] = useState({}); // State to store validation errors
    const navigate = useNavigate(); // Hook for programmatic navigation

    const url = "http://localhost:8081/login"; // Backend login endpoint

    // Function to validate input data
    const ValidData = () => {
        const errors = {}; // Object to collect validation errors

        // Validate username and password fields
        if (Username === "" && Password === "") {
            errors.invalidUser = "Enter the username";
            errors.invalidPassword = "Enter the Password";
        } else if (!Username.endsWith("@gmail.com")) {
            errors.invalidUser = "Invalid Username";
        } else if (Username === "") {
            errors.invalidUser = "Enter the username";
        } else if (Password === "") {
            errors.invalidPassword = "Enter the password";
        }

        // If errors exist, update the Error state, else send data to the backend
        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setError({});
            axios.post(url, {
                username: Username,
                password: Password
            })
            .then((response) => {
                setUser(response.data); // Set the user state based on the backend response
            })
            .catch((error) => {
                console.log(error); // Log any error from the backend request
            });
        }
    };

    // Function to navigate based on the backend response
    function Nvigate() {
        if (user === "login") {
            navigate("/flightBooking", { state: { id: 1, uname: Username } }); // Navigate to flight booking page if login is successful
        } else if (user === "invalid") {
            return <h5 className={styles.invalid}>Invalid Credentials</h5>; // Display error message if login is invalid
        }
    }

    return (
        <div id="container" className={styles.container}>
            <div id='loginid' className={styles.loginForm}>
                <h2 id='loginh2' className={styles.loginHeader}>Login</h2>

                {/* Display error message for invalid username */}
                {Error.invalidUser && <p className={styles.errorMessage}>{Error.invalidUser}</p>}
                <input 
                    type="email" 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Email"
                    required 
                    className={styles.inputBox} 
                />
                
                {/* Display error message for invalid password */}
                {Error.invalidPassword && <p className={styles.errorMessage}>{Error.invalidPassword}</p>}
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    className={styles.inputBox} 
                />
                
                
                <button onClick={ValidData} className={styles.loginButton}>Login</button>
                <Nvigate /> 
                
                
                <p className={styles.registerText}>
                    <b>Don't have an account? </b><a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
