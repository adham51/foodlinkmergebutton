import React from "react";
import { FoodProvider } from "./context/FoodContext";
import DonerDashboard from "./components/DonorDashBoard/DonorDashBoard";
import "bootstrap/dist/css/bootstrap.min.css";
import FoodDonationApp from "./components/CharityDashBoard/FoodDonationApp";
import styles from "./App.module.css";
import Navbar from "./components/Header.js/NavBar";
import { Outlet } from "react-router";
import LandingPage from "./components/Header.js/LandingPage";

const App = () => {
  return (
    <div>

      <LandingPage></LandingPage>
    </div>
  );
};

export default App;
