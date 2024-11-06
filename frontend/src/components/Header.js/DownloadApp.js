import React, { useState } from 'react';
import styles from './DownloadApp.module.css';

export default function DownloadApp() {
    const [arrowMove, setArrowMove] = useState(false); // Define the state

    return (
        <section className={styles.downloadcontainer}>

            <div className={styles.callToAction}>
                <div className={styles.left}>
                    START SAVING FOOD TODAY
                </div>
                <div
                    className={styles.right}
                    onMouseEnter={() => setArrowMove(true)}
                    onMouseLeave={() => setArrowMove(false)}
                >
                    DOWNLOAD THE APP
                    <span className={`${styles.arrow} ${arrowMove ? styles.moveArrow : ''}`}>&rarr;</span>
                </div>
            </div>

        </section>

    );
}
