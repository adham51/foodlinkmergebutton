import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodList, setFoodList] = useState(() => {
    const savedFoodList = localStorage.getItem("foodList");
    return savedFoodList ? JSON.parse(savedFoodList) : [];
  });
  const [currUserId, setCurrUserID] = useState(() => {
    return localStorage.getItem("currUserId") || null;
  });

  // Add food item and update local storage
  const addFoodItem = async (newFood) => {
    try {
      const response = await axios.post("http://localhost:3003", newFood); // api/
      const updatedFoodList = [...foodList, response.data];
      setFoodList(updatedFoodList);
      localStorage.setItem("foodList", JSON.stringify(updatedFoodList)); // Save to local storage
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  // Fetch food items for the current user
  useEffect(() => {
    const fetchFoodItems = async () => {
      if (currUserId) {
        try {
          const response = await axios.get(`/api/donor/${currUserId}`);
          const fetchedFoodItems = response.data;
          setFoodList(fetchedFoodItems);
          localStorage.setItem("foodList", JSON.stringify(fetchedFoodItems)); // Save to local storage
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      }
    };

    fetchFoodItems();
  }, [currUserId,foodList]);

  // Function to handle user login
  const handleUserLogin = (userId) => {
    setCurrUserID(userId);
    localStorage.setItem("currUserId", userId); // Save user ID to local storage
  };

  // Function to handle user logout
  const handleUserLogout = () => {
    setCurrUserID(null);
    localStorage.removeItem("currUserId"); // Remove user ID from local storage
    setFoodList([]);
    localStorage.removeItem("foodList"); // Clear food list in local storage
  };

  return (
    <FoodContext.Provider value={{ foodList, addFoodItem, currUserId, handleUserLogin, handleUserLogout }}>
      {children}
    </FoodContext.Provider>
  );
};
