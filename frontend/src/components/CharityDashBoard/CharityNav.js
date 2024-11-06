import React from 'react';
import styles from './CharityNav.module.css';

const CharityNav = ({ charityName, onLogout, onViewFoodList, onViewRequests }) => {
    const handleLogout = () => {
        localStorage.clear(); // Clear the local storage
        onLogout(); // Call the original onLogout function
    };
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLeft}>
                <h2 className={styles.navLeft}>{charityName}</h2> {/* Dynamically displaying the charity name */}
            </div>
            <div className={styles.navRight}>
                <button onClick={onViewFoodList}>Available Food List</button>
                <button onClick={onViewRequests}>Your Requests</button> {/* Add this button */}
                <button onClick={handleLogout} className={styles.dangerButton}>
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default CharityNav;