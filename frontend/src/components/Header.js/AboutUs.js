import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './AboutUs.module.css';
import bag from '../../Assets/bag2.png';

export default function AboutUs() {
    const [totalMeals, setTotalMeals] = useState(0);
    const [totalCharities, setTotalCharities] = useState(0);

    const imageRef = useRef(null);
    const topTextRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);

    useEffect(() => {
        axios.get('/api/request/totalmeals')
            .then((response) => {
                setTotalMeals(response.data.totalMeals);
            })
            .catch((error) => {
                console.error('Error fetching total meals:', error);
            });

        axios.get('/api/request/totalcharities')
            .then((response) => {
                setTotalCharities(response.data.totalCharities);
            })
            .catch((error) => {
                console.error('Error fetching total charities:', error);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const rect = imageRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                imageRef.current.classList.add(styles.revealImage);
                topTextRef.current.classList.add(styles.revealText);
                leftTextRef.current.classList.add(styles.revealRightLeft);
                rightTextRef.current.classList.add(styles.revealRightLeft);
            } else {
                imageRef.current.classList.remove(styles.revealImage);
                topTextRef.current.classList.remove(styles.revealText);
                leftTextRef.current.classList.remove(styles.revealRightLeft);
                rightTextRef.current.classList.remove(styles.revealRightLeft);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="about" className={styles.aboutUs}>
            {/* Mission Title and Text */}
            <div className={styles.missionTitle}>
                <div className={styles.titleRectangle}></div>
                <h2>OUR MISSION</h2>
            </div>
            <div className={styles.missionText}>
                <p>Food Link is a social impact company with a mission to empower everyone to fight food waste in Egypt together.</p>
            </div>

            {/* Impact Stats */}
            <div className={styles.impactStats}>
                <div className={styles.stat}>
                    <h3>21+</h3>
                    <p>Meals Donated</p>
                </div>
                <div className={styles.stat}>
                    <h3>4+</h3>
                    <p>Charities Helped</p>
                </div>
            </div>


            {/* Why Use FoodLink */}
            <div ref={topTextRef} className={styles.topText}>
                <h2>Why Use</h2>
                <h2 className={styles.topTextFL}>Food Link</h2>
            </div>

            <div classNmae={styles.poptext}>
            {/* Left Text with Earth Icon */}
            <div ref={leftTextRef} className={styles.textLeft}>
                <p><i className="fas fa-globe"></i> Help the environment by reducing food waste</p>
            </div>

            {/* Right Text with Pizza Icon */}
            <div ref={rightTextRef} className={styles.textRight}>
                <p>Save food near you <i className="fas fa-pizza-slice"></i></p>
            </div>
            </div>

            {/* Image */}
            <div className={styles.imageContainer}>
                <img src={bag} alt="Food Link Logo" ref={imageRef} className={styles.missionImage} />
            </div>
        </section>
    );
}
