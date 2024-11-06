import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './FoodList.module.css'; 
import foodImage from '../../Assets/food-item.jfif'; // Placeholder image

export default function FoodList({ onSelectFood }) {
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch available food donations from the backend
    useEffect(() => {
        axios.get('/api/available')
            .then((response) => {
                setFoodList(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching food data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Available Food Donations</h1>
            {foodList.length === 0 ? (
                <p>No available food donations.</p>
            ) : (
                <div className="container">
                    <div className="row">
                        {foodList.map(food => (
                            <div className="col-md-4 mb-4" key={food.food_id}>
                                <div className="card h-100" onClick={() => onSelectFood(food.food_id)}>
                                    <img 
                                        src={foodImage} 
                                        alt="Food Donation" 
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{food.food_name}</h5>
                                        <p className={`card-text `}>Quantity:    {food.quantity}</p>
                                        <p className={`card-text `}>Description: {food.description}</p>
                                        <p className={`card-text `}>Expiration Date: {new Date(food.expiration_date).toLocaleDateString()}</p>
                                        <span className={`card-text ${styles.greenText}`}>Status: {food.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}