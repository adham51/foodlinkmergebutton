import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodItem.css"; // For additional custom styling

export default function FoodItem({ food, index }) {
  const [charityInfo, setCharityInfo] = useState(null);
  const [requestId, setRequestId] = useState(null); // Track the request ID
  const [isDonated, setIsDonated] = useState(''); // Track donation status

  useEffect(() => {
    // Fetch charity info and request ID if the food is claimed
    if (food.status === "claimed") {
      // Fetch charity info
      axios
        .get(`/charityinfo/food/${food.food_id}`)
        .then((response) => {
          setCharityInfo(response.data[0]); // Assuming response is an array with one object
        })
        .catch((error) => {
          console.log("Error fetching charity info", error);
        });

      // Fetch the request ID associated with this food item
      axios
        .get(`/getrequestid/${food.food_id}`)
        .then((response) => {
          setRequestId(response.data.requestId); // Set requestId
        })
        .catch((error) => {
          console.log("Error fetching request ID", error);
        });
    }
  }, [food.status, food.food_id]);

  useEffect(() => {
    // Fetch request status if requestId is available
    if (requestId) {
      axios
        .get(`/requeststatus/${requestId}`)
        .then((response) => {
          setIsDonated(response.data.status); // Set donation status
        })
        .catch((error) => {
          console.log("Error fetching request status", error);
        });
    }
  }, [requestId]); // Dependency on requestId

  // Handle donation (when Donate button is clicked)
  const handleDonate = () => {
    if (requestId) {
      axios
        .put(`/updaterequeststatus/${requestId}`, { status: "fulfilled" })
        .then((response) => {
          console.log("Request fulfilled:", response.data);
          setIsDonated("fulfilled"); // Mark donation as complete
        })
        .catch((error) => {
          console.error("Error updating request status:", error);
        });
    }
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
      <div className={`card h-100 ${food.status === "claimed" ? "claimed-card" : "available-card"}`}>
        <div className="card-body">
          <h5 className="card-title">{food.food_name}</h5>
          <p className="card-text">Quantity: {food.quantity}</p>
          <p className="card-description">Description: {food.description}</p>
          <p className="card-expiration">
            Expiration Date: <strong>{new Date(food.expiration_date).toLocaleDateString()}</strong>
          </p>
          <p className={`food-status ${food.status === "claimed" ? "text-danger" : "text-success"}`}>
            Status: {food.status}
          </p>

          {/* Display charity info if the food is claimed */}
          {food.status === "claimed" && charityInfo && (
            <div className="charity-info mt-3">
              <p className="claimed-by">
                <strong>Claimed by:</strong> {charityInfo.name}
              </p>
              <p className="charity-email">
                <strong>Charity Email:</strong> {charityInfo.email}
              </p>
            </div>
          )}

          {/* Donate button to fulfill the request */}
          {food.status === "claimed" && isDonated !== "fulfilled" && (
            <button className="btn btn-primary mt-2" onClick={handleDonate}>
              Donate
            </button>
          )}

          {/* Show message if the donation is completed */}
          {isDonated === "fulfilled" && (
            <p className="text-success mt-2">Donation completed successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
}
