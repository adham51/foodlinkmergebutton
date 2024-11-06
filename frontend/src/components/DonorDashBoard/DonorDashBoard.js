import React, { useContext, useEffect, useState } from "react";
import { FoodContext } from "../../context/FoodContext";
import FoodList from "./FoodList";
import AddFoodForm from "./AddFoodForm";
import Navbar from "../Header.js/NavBar";
import axios from 'axios'

import './DonorDashBoard.css'

const DonerDashboard = () => {
  const { foodList } = useContext(FoodContext);
  const [showForm, setShowForm] = useState(false);



  const toggleForm = () => {
    setShowForm(!showForm);
  };


  return (
    <div className="doner-dashboard container-fluid">
      <Navbar /> 
      <br/>

      <h1 className="text-center mb-4">Donor Dashboard</h1>
      <div className="row"><div className="text-end mt-3" style={{marginRight:"15%"}}>
        <button className="btn btn-success toggle-add-food-button" onClick={toggleForm}>
          {showForm ? "Close" : "Add Food"}
        </button>
      </div>
        <div className="col-12 col-md-8"> 
          <div className="food-list">
            <FoodList foodList={foodList} />
          </div>
        </div>

        {showForm && (
          <div className="col-12 col-md-4">
            <div className="form-section">
              <AddFoodForm />
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default DonerDashboard;
