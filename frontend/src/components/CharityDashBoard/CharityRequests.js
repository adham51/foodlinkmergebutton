import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CharityRequests.module.css';

export default function CharityRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const charityName = localStorage.getItem('charityName'); // Get the charityName
                const token = localStorage.getItem('token'); // Assuming you are storing the JWT token after login
                const charityResponse = await axios.get('/api/auth/me', {
                    headers: {
                        Authorization: `${token}`, // Pass the token to the backend
                    },
                });
                let charityId = charityResponse.data.user_id;

                // If charityId is not in localStorage, fetch it using charityName
                if (!charityId) {
                    const charityResponse = await axios.get(`/api/charityid/${charityName}`);
                    if (charityResponse.data.user_id) {
                        charityId = charityResponse.data.user_id;
                        localStorage.setItem('charityId', charityId); // Save charityId in localStorage
                    } else {
                        setError('Charity not found.');
                        setLoading(false);
                        return;
                    }
                }

                // Fetch requests based on charityId
                const response = await axios.get(`/api/charity/${charityId}`);
                const requestData = response.data;

                // Fetch food details for each request
                const requestsWithFoodDetails = await Promise.all(
                    requestData.map(async (request) => {
                        const foodResponse = await axios.get(`/api/food/${request.food_id}`);
                        return {
                            ...request,
                            food_name: foodResponse.data.food_name,
                            quantity: foodResponse.data.quantity,
                        };
                    })
                );

                // fetch donor-id by request.food_id
                const requestsWithDonorDetails = await Promise.all(
                    requestsWithFoodDetails.map(async (request) => {
                        const donorResponse = await axios.get(`/api/userID/${request.food_id}`);
                        const donorId = donorResponse.data.user_id;
                        const donorInfoResponse = await axios.get(`/api/donorinfo/${donorId}`);
                        return {
                            ...request,
                            donor_name: donorInfoResponse.data.name,
                            donor_email: donorInfoResponse.data.email,
                        };
                    })
                );

                setRequests(requestsWithDonorDetails);
                setLoading(false);
                
            } catch (error) {
                console.log(error);
                setError('Error fetching requests.');
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleCancelRequest = async (requestId) => {
        try {
            const response = await axios.put(`/api/updaterequest/${requestId}`, { status: 'cancelled' });
            setSuccessMessage(response.data.message);

            // Update the requests list after successful cancellation
            setRequests((prevRequests) =>
                prevRequests.filter((request) => request.request_id !== requestId)
            );
        } catch (error) {
            setError('Error cancelling the request.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Your Food Pickup Requests</h1>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            {requests.length === 0 ? (
                <p>No pickup requests found.</p>
            ) : (
                <ul className={styles.requestList}>
                    {requests.map((request) => (
                        <li key={request.request_id} className={styles.requestItem}>
                            <div>
                                <strong>Food Name:</strong> {request.food_name}
                                <p><strong>Quantity:</strong> {request.quantity}</p>
                                <p><strong>Donor Name:</strong> {request.donor_name}</p>
                                <p><strong>Donor Email:</strong> {request.donor_email}</p>
                                <span><strong>Status:</strong> {request.status}</span>
                            </div>
                            {request.status !== 'cancelled' && (
                                <button
                                    onClick={() => handleCancelRequest(request.request_id)}
                                    className={styles.cancelButton}
                                >
                                    Cancel Request
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
