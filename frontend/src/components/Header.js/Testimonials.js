import React from 'react';
import styles from './Testimonials.module.css';
import qot from '../../Assets/qot.png'; // Make sure the path is correct

export default function Testimonials() {
    return (
        <section id="testimonials" className={styles.testimonials}>
            <div className={styles.titleContainer}>
                <div className={styles.titleRectangle}></div>
                <h2>Testimonials</h2>
            </div>
            <div className={styles.header}>
                <h3>
                    Hear why <span className={styles.highlightedText}>our community</span> loves Food Link
                </h3>
            </div>
            <div className={styles.testimonialsGrid}>
                {/* First Testimonial Card (Donor) */}
                <div className={styles.testimonialCard}>
                    <div className={styles.cardContent}>
                        <h4>An amazing community</h4>
                        <img src={qot} alt="Quote" className={styles.quoteIcon} />
                        <p>
                            I started donating surplus food through Food Link, 
                            and it has completely changed how I give back to my community in Cairo. 
                            The platform makes it easy to list food, and knowing that it goes directly to 
                            people who need it most has been incredibly rewarding. I’m so proud to be part 
                            of a community that’s actively fighting food waste and hunger here in Egypt.
                        </p>
                        <div className={styles.personInfo}>
                            <img src="path_to_image" alt="Sarah Hassan" className={styles.personImage} />
                            <div className={styles.personDetails}>
                                <h5>Sarah Hassan</h5>
                                <p>Food-Linker</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Second Testimonial Card (Charity Member) */}
                <div className={styles.testimonialCard}>
                    <div className={styles.cardContent}>
                        <h4>What our charity needed</h4>
                        <img src={qot} alt="Quote" className={styles.quoteIcon} />
                        <p>
                            As a charity in Giza, we rely on Food Link for access to surplus food. 
                            It has provided our community with nutritious meals and has helped us reduce costs. 
                            Food Link’s easy-to-use platform and dedicated volunteers have been a game-changer for us.
                        </p>
                        <div className={styles.personInfo}>
                            <img src="path_to_image" alt="Mohamed Ali" className={styles.personImage} />
                            <div className={styles.personDetails}>
                                <h5>Mohamed Ali</h5>
                                <p>Food-Linker</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}