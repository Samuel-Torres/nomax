import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.rowItem}>
          <h2>About Us</h2>
          <p>
            Learn more about our mission and vision to connect communities
            abroad.
          </p>
        </div>

        <div className={styles.rowItem}>
          <h2>Contact</h2>
          <p>
            Get in touch with our support team for any inquiries or assistance.
          </p>
        </div>

        <div className={styles.rowItem}>
          <h2>FAQs</h2>
          <p>
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <div className={styles.rowItem}>
          <h2>Legal</h2>
          <ul>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className={styles.rowItem}>
          <h2>Blog</h2>
          <p>
            Read our latest articles and updates on community building and
            travel.
          </p>
        </div>

        <div className={styles.rowItem}>
          <h2>Careers</h2>
          <p>
            Explore job opportunities and join our team to make a global impact.
          </p>
        </div>

        <div className={styles.rowItem}>
          <h2>Press Room</h2>
          <p>Stay updated with our latest news and press releases.</p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>&copy; 2023 Nomax. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
