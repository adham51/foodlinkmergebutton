import React, { useState, useContext } from 'react';
import { FoodContext } from '../../context/FoodContext';
import axios from 'axios';

const AddFoodForm = () => {
    const { addFoodItem } = useContext(FoodContext);
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that quantity is a number
        if (isNaN(quantity) || quantity <= 0) {
            setError('Quantity must be a positive number.');
            return;
        }

        // Create new food item
        const newFood = {
            food_name: foodName,
            quantity: Number(quantity),
            description: description,
            expiration_date: expirationDate,
        };

        try {
            // Make a POST request to your backend
            const response = await axios.post('/api/add', newFood, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            // Add the new food item to context state
            addFoodItem(response.data); // Ensure this data matches the format you need

            // Clear the form fields
            setFoodName('');
            setQuantity('');
            setDescription('');
            setExpirationDate('');
            setError('');
        } catch (err) {
            setError('Error adding food donation. Please try again.');
        }
    };

    return (
        <div className="add-food-form">
            
            <h2 className="mb-4">Add New Food Donation</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="foodName" className="form-label">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        className="form-control"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="expirationDate" className="form-label">Expiration Date:</label>
                    <input
                        type="date"
                        id="expirationDate"
                        className="form-control"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Add Food</button>
            </form>
        </div>
    );
};

export default AddFoodForm;
