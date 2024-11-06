import React from 'react';
import styles from './Footer.module.css';
import ig from '../../Assets/igg.png'; // Ensure this path is correct
import linkedin from '../../Assets/LN.png'; // Ensure this path is correct
import youtube from '../../Assets/yt.png'; // Ensure this path is correct
import fb from '../../Assets/fb.png'; // Ensure this path is correct
import logo from '../../Assets/logoidea1.png'; // Ensure this path is correct
import sdg1 from '../../Assets/goal1.png'; // Ensure this path is correct
import sdg22 from '../../Assets/goal2.png'; // Ensure this path is correct
import apple from '../../Assets/google.png'; // Ensure this path is correct
import google from '../../Assets/Apple.png'; // Ensure this path is correct
import huawei from '../../Assets/huawei.png'; // Ensure this path is correct


const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      {/* Top Layer (lighter background) */}
      <div className={styles.footerTop}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        {/* Center Section */}
        <div className={styles.centerSection}>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Instagram">
              <img src={ig} alt="Instagram Icon" style={{ width: "40px", height: "auto" }} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={linkedin} alt="LinkedIn Icon" style={{ width: "40px", height: "auto" }} />
            </a>
            <a href="#" aria-label="Facebook">
              <img src={fb} alt="Facebook Icon" style={{ width: "33px", height: "auto" }} />
            </a>
            <a href="#" aria-label="YouTube">
              <img src={youtube} alt="YouTube Icon" style={{ width: "40px", height: "auto" }} />
            </a>
          </div>

          <div className={styles.appLinks}>
            <img src={apple} alt="App Store" />
            <img src={google} alt="Google Play" />
            <img src={huawei} alt="App Gallery" />
          </div>
          <div className={styles.contactInfo}>
            <p>Email: <a href="mailto:FoodLink@org">FoodLink@org</a></p>
            <p>Phone: +20 111 012 3456</p>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.sdgs}>
            <img src={sdg1} alt="Goal 1: No Poverty" className={styles.sdgImage} />
            <img src={sdg22} alt="Goal 2: Zero Hunger" className={styles.sdgImage} />
          </div>
        </div>
      </div>

      {/* Bottom Layer (darker background) */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomLinks}>
          <a href="#">Legal</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Contact Us</a>
          <a href="#">DSA Disclosure</a>
          <a href="#">Do Not Sell or Share My Data</a>
          <a href="#">Food Waste Sources</a>
          <a href="#">Status</a>
        </div>
        <p>Copyright © 2023—2024 Food Link. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;