import React from 'react';
import styles from './HowItWorks.module.css';
import charity from '../../Assets/greenbg.png';

export default function HowItWorks() {
    return (
        <section id="how-it-works" className={styles.howItWorks}>
            <div className={styles.titleContainer}>
                <div className={styles.titleRectangle}></div>
                <h2 className={styles.title}>How It Works</h2>
            </div>
            <div className={styles.stepsContainer}>
                {/* For Donors (Left side) */}
                <div className={styles.stepsColumn}>
                    <h3>For Donors:</h3>
                    <ul className={styles.stepList}>
                        <li>
                            <span className={styles.numberedStep}>1)</span> List surplus food
                        </li>
                        <li>
                            <span className={styles.numberedStep}>2)</span> Coordinate pick-ups easily
                        </li>
                        <li>
                            <span className={styles.numberedStep}>3)</span> Track your donations
                        </li>
                    </ul>
                </div>

                {/* Image in the middle */}
                <div className={styles.imageContainer}>
                    <img src={charity} alt="How It Works" className={styles.image} />
                </div>

                {/* For Charities (Right side) */}
                <div className={styles.stepsColumn}>
                    <h3>For Charities:</h3>
                    <ul className={styles.stepList}>
                        <li>
                            <span className={styles.numberedStep}>1)</span> Browse available food
                        </li>
                        <li>
                            <span className={styles.numberedStep}>2)</span> Request items you need
                        </li>
                        <li>
                            <span className={styles.numberedStep}>3)</span> Arrange pick-ups with ease
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}