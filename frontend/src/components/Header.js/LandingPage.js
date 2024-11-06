import React from 'react';
import Navbar from './NavBar';  
import HeroSection from './HeroSection';  
import AboutUs from './AboutUs';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Footer from '../Footer/Footer';
import styles from './LandingPage.module.css';  
import DownloadApp from './DownloadApp';

export default function LandingPage() {
    return (
        <>
            <div className={styles.landingPage}>
                <Navbar /> 

                {/* Sections with corresponding IDs for HashLink scrolling */}
                <div id="hero">
                    <HeroSection />
                </div>

                <div id="about">
                    <AboutUs />
                </div>

                <div id="how-it-works">
                    <HowItWorks />
                </div>

                <div id="testimonials">
                    <Testimonials />
                </div>

                <DownloadApp />

                <div id="call-to-action">
                    <CallToAction />
                </div>

                <div id="footer">
                    <Footer />
                </div>
            </div>
        </>
    );
}