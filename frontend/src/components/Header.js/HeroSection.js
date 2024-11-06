import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import styles from './HeroSection.module.css';
import background from '../../Assets/Home-img.png'; // Your background image path

export default function HeroSection() {
    return (
        <section id="home" className={styles.hero} style={{ backgroundImage: `url(${background})` }}>
            <div className={styles.heroOverlay}></div> {/* Overlay to darken background */}
            <div className={styles.heroContent}>
                <span>We Connect Surplus Food with Those in Need</span> {/* Main headline */}
                <p className={styles.subheadline}>Become a Food-Linker: Save Food with a Tap!</p> {/* Subheadline */}
                <div className={styles.buttonGroup}>
                    <Link to="/SignUpDonor" className={styles.link}>
                        <button className={styles.btnPrimary}>Sign Up as Donor</button>
                    </Link>
                    <Link to="/SignUpCharity" className={styles.link}>
                        <button className={styles.btnSecondary}>Sign Up as Charity</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
