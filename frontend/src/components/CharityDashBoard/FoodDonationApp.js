// FoodDonationApp.js
import React, { useState, useEffect } from 'react';
import FoodList from './FoodList';
import PickUpRequestForm from './PickUpRequestsForm';
import CharityRequests from './CharityRequests'; // Import the new component
import styles from './FoodDonationApp.module.css';
import CharityNav from './CharityNav';
import { useNavigate } from 'react-router';

export default function FoodDonationApp() {
    const [selectedFoodId, setSelectedFoodId] = useState(null);
    const [charityName, setCharityName] = useState('');
    const [viewRequests, setViewRequests] = useState(false); // New state for handling requests view
    const navigate = useNavigate();

    useEffect(() => {
        const storedCharityName = localStorage.getItem('charityName');
        if (storedCharityName) {
            setCharityName(storedCharityName);
        }
    }, []);

    const handleFoodSelect = (foodId) => {
        setSelectedFoodId(foodId);
    };

    const handleBackToFoodList = () => {
        setSelectedFoodId(null); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('charityName');
        navigate('/');
    };

    const handleViewFoodList = () => {
        setViewRequests(false); // Set viewRequests to false to show food list
        setSelectedFoodId(null);
    };

    const handleViewRequests = () => {
        setViewRequests(true); // Set viewRequests to true to show requests page
    };

    return (
        <div className={styles.container}>
            <CharityNav 
                charityName={charityName} 
                onLogout={handleLogout} 
                onViewFoodList={handleViewFoodList}
                onViewRequests={handleViewRequests} // Pass the handler for viewing requests
            />

            {viewRequests ? (
                <CharityRequests /> // Render the CharityRequests component when viewRequests is true
            ) : !selectedFoodId ? (
                <FoodList onSelectFood={handleFoodSelect} />
            ) : (
                <PickUpRequestForm selectedFoodId={selectedFoodId} onBack={handleBackToFoodList} />
            )}
        </div>
    );
}