import React, { useState } from 'react';
import axios from 'axios';
import styles from './SignUpCharity.module.css'; // Make sure to create a CSS file for styling
import Navbar from '../../Header.js/NavBar';
import Footer from '../../Footer/Footer';

const SignUpCharity = () => {  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [charityId, setCharityId] = useState(''); // To store and display charity_id

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
            const response = await axios.post('/api/registercharity', formData);
            setMessage(response.data.message);
            
            // Check if the response contains charity_id
            if (response.data.charity_id) {
                setCharityId(response.data.charity_id); // Set charity_id
            }

            // Optionally, reset the form after successful submission
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            console.error('Error registering charity:', error);
            setMessage('Error registering charity. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <Navbar> </Navbar>

            <h2>Sign Up as Charity</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"

                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            {charityId && <p className={styles.charityId}>Your Charity ID: {charityId}</p>} {/* Display charity_id */}
            <br></br>
            <br></br>
            <Footer></Footer>
        </div>
    );
};

export default SignUpCharity;
