import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PickUpRequestsForm.module.css';

export default function PickUpRequestForm({ selectedFoodId, onBack }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [foodDetails, setFoodDetails] = useState(null); // State to hold food item details

    // Fetch the selected food item details based on selectedFoodId
    useEffect(() => {
        setLoading(true);
        axios.get(`/api/food/${selectedFoodId}`) // Assuming this is the endpoint to get food item details
            .then((response) => {
                setFoodDetails(response.data); // Store the fetched food item details
                setError('');
            })
            .catch(() => {
                setError('Error fetching food details.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedFoodId]);

    // Handle the form submission for requesting a food pickup
    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            food_id: selectedFoodId, // No need for charity_id, it'll be handled on the server side
        };

        setLoading(true);
        axios.post('/api/request', requestData, {
            headers: {
                Authorization: `${localStorage.getItem('token')}` // Assuming token is stored in localStorage
            }
        })
        .then(() => {
            setSuccessMessage('Pickup request submitted successfully!');
            setError('');
        })
        .catch(() => {
            setError('Error submitting pickup request.');
            setSuccessMessage('');
        })
        .finally(() => {
            setLoading(false); // Always run this after the request
        });
    };

    return (
        <div className={styles.container}>
            <h1>Request a Food Pickup</h1>
            
            {/* Display food item details after fetching them */}
            {foodDetails && (
                <div className={styles.foodDetails}>
                    <h2>Food Item Details</h2>
                    <p><strong>Food Name:</strong> {foodDetails.food_name}</p>
                    <p><strong>Quantity:</strong> {foodDetails.quantity}</p>
                    <p><strong>Description:</strong> {foodDetails.description}</p>
                    <p><strong>Expiration Date:</strong> {foodDetails.expiration_date}</p>
                </div>
            )}

            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <button onClick={onBack} className={styles.backButton}>
                Back to Food List
            </button>

            <form onSubmit={handleSubmit} className={styles.form}>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
}
