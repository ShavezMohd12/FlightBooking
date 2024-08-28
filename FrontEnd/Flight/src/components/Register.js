import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../register.module.css'; 

function Register() {
    // States to manage the form inputs and registration status
    const [Email, setEmail] = useState('empty');
    const [Name, setName] = useState('empty');
    const [Phone, setPhone] = useState('empty');
    const [Password, setPassword] = useState('p');
    const [Adhar, setAdhar] = useState('empty');
    const [confirmPassword, setConfirmPassword] = useState('cp');
    const [status, setStatus] = useState("state");
    const navigate = useNavigate(); // Hook for navigation

    const url = "http://localhost:8081/register"; // Backend registration endpoint

    // Function to handle registration logic
    const handleRegister = () => {
        if(Phone.length!=10)
        {
            alert("Enter correct phone no.")
        }
        // Check if passwords match and if all fields are filled
        else if (Password === confirmPassword) {
            axios.post(url, {
                adhar: Number(Adhar),
                name: Name.toUpperCase(),
                email: String(Email),
                phone: Number(Phone),
                password: Password
            }).then((response) => {
                setStatus(response.data); // Update status based on backend response
            }).catch((error) => {
                console.log(error); // Log any errors
            });
        } else if (Password === "p" || confirmPassword === "cp" || Adhar === "empty" || Name === "empty" || Phone === "empty" || Email === "empty") {
            alert("Fields are empty"); 
        } else {
            alert("Passwords do not match, try again"); 
        }
    };

    // Component to display error or success messages
    const Error = () => {
        return (
            <div className={styles.errorContainer}>
                {status === "success" 
                    ? <h5 className={styles.successMessage}>Your Data Is Registered</h5> 
                    : <h5 className={styles.errorMessage}>Already Exist! Try Again</h5>}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.header}>Register</h2>

               
                <label htmlFor="adhar" className={styles.label}>Aadhar Number</label>
                <input
                    type="text" id="adhar"
                    maxLength="12" minLength="12"
                    onChange={(e) => setAdhar(e.target.value)}
                    placeholder="Aadhar"
                    required
                    className={styles.inputBox}
                />

              
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input
                    type="text" id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    className={styles.inputBox}
                />

            
                <label className={styles.label}>Email</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className={styles.inputBox}
                />

        
                <label className={styles.label}>Phone Number</label>
                <input
                    type="text"
                    maxLength="10" minLength="10"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    required
                    className={styles.inputBox}
                />

           
                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className={styles.inputBox}
                />

               
                <label className={styles.label}>Confirm Password</label>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className={styles.inputBox}
                />

                
                <button type="submit" onClick={handleRegister} className={styles.submitButton}>
                    Register
                </button>
                
                {/* Conditional rendering of error or success messages */}
                {status !== 'state' && <Error />}

               
                <p className={styles.loginLink}>
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
