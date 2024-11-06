import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";  // Your main App component
import Navbar from "./components/Header.js/NavBar";
import HeroSection from "./components/Header.js/HeroSection";
import HowItWorks from "./components/Header.js/HowItWorks";
import Testimonials from "./components/Header.js/Testimonials";
import CallToAction from "./components/Header.js/CallToAction";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error/Error";
import AboutUs from "./components/Header.js/AboutUs";
import LandingPage from "./components/Header.js/LandingPage";
import SignUpDonor from "./components/SignUp/SignUpDonor/SignUpDonor";
import SignUpCharity from "./components/SignUp/SignUpCharityy/SignUpCharity";
import Login from "./components/Login/Login";
import FoodDonationApp from "./components/CharityDashBoard/FoodDonationApp";
import DonorDashBoard from "./components/DonorDashBoard/DonorDashBoard";
import { FoodProvider } from "./context/FoodContext";

// Defining routes for navigation using React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FoodProvider>
        <App /> {/* Ensure App component can access context */}
      </FoodProvider>
    ),
  },
  { path: "*", element: <Error /> },  // Handle unmatched routes
  { path: "/navbar", element: <Navbar /> },
  { path: "/HeroSection", element: <HeroSection /> },
  { path: "/HowItWorks", element: <HowItWorks /> },
  { path: "/Testimonials", element: <Testimonials /> },
  { path: "/CallToAction", element: <CallToAction /> },
  { path: "/AboutUs", element: <AboutUs /> },
  { path: "/LandingPage", element: <LandingPage /> },
  { path: "/SignUpDonor", element: <SignUpDonor /> },
  { path: "/SignUpCharity", element: <SignUpCharity /> },
  { path: "/food-link", element: <LandingPage /> },
  {
    path: "/Login",
    element: (
      <FoodProvider>
        <Login />
      </FoodProvider>
    ),
  },
  { path: "/FoodDonationApp", element: <FoodDonationApp /> },
  {
    path: "/DonerDashboard",
    element: (
      <FoodProvider>
        <DonorDashBoard />
      </FoodProvider>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
