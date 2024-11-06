import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../Header.js/NavBar';
import Footer from '../Footer/Footer';
import styles from './Login.module.css'; 
import { FoodContext } from '../../context/FoodContext'; // Import FoodContext

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const { handleUserLogin } = useContext(FoodContext); // Access handleUserLogin from context

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', formData);
            setMessage(response.data.message);
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('charityName', response.data.data[0].name); 
    
                // Call handleUserLogin to store userId
                handleUserLogin(response.data.data[0].user_id); // Assuming response contains user_id

                // Redirect based on user type
                if (response.data.data[0].user_type === 'charity') {
                    navigate('/FoodDonationApp'); 
                } else if (response.data.data[0].user_type === 'donor') {
                    navigate('/DonerDashBoard'); 
                } else {
                    navigate('/FoodDonationApp'); 
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Error logging in. Please try again.');
        }
    };
    
    return (
        <div className={styles.container}>
            <Navbar></Navbar>
            
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            <br></br>
            <br></br>
            <br></br>
            <Footer></Footer>
        </div>
    );
};

export default Login;
