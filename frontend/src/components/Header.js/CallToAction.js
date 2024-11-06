import React from 'react';
import styles from './CallToAction.module.css';

export default function FoodWasteInfo() {
    return (
        <section className={styles.foodWasteInfo}>
            <div className={styles.titleContainer}>
                <div className={styles.titleRectangle}></div>
                <h2>ABOUT FOOD WASTE</h2>
            </div>
            <div className={styles.header}>
                <h2>WHY IS FOOD WASTE A PROBLEM?</h2>
                <p>
                    Food waste has an enormous impact on society, the economy and the environment. 
                    As such, reducing food waste presents a powerful opportunity to make a positive 
                    impact on climate change, the cost of living, and food accessibility.
                </p>
            </div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <div className={styles.icon}>🌍</div>
                    <h3>10%</h3>
                    <p className={styles.secondline}>OF ALL GREENHOUSE GAS EMISSIONS WORLDWIDE</p>
                    <p>are caused by food waste</p>
                    <p className={styles.source}>(WWF, 2024)</p>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.icon}>💧</div>
                    <h3>25%</h3>
                    <p className={styles.secondline}>OF FRESHWATER USED ANNUALLY</p>
                    <p>goes into food that ultimately goes to waste</p>
                    <p className={styles.source}>(WWF, 2024)</p>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.icon}>🚜</div>
                    <h3>11.5%</h3>
                    <p className={styles.secondline}>OF ALL LAND IN THE WORLD</p>
                    <p>Producing food that ultimately goes to waste takes up a land area larger than China</p>
                    <p className={styles.source}>(WWF, 2024)</p>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.icon}>💵</div>
                    <h3>$1.1 TRILLION</h3>
                    <p>is the amount of money lost through food waste every year</p>
                    <p className={styles.source}>(WWF, 2024)</p>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.icon}>🍽️</div>
                    <h3>2.4 BILLION PEOPLE</h3>
                    <p>do not have access to adequate, nutritious food</p>
                    <p className={styles.source}>(FAO, 2023)</p>
                </div>
                <div className={styles.infoItem}>
                    <div className={styles.icon}>👨‍👩‍👧‍👦</div>
                    <h3>783 MILLION PEOPLE</h3>
                    <p>are affected by hunger every day</p>
                    <p className={styles.source}>(FAO, 2023)</p>
                </div>
            </div>
        </section>
    );
}