import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import styles from './footer.module.css'; // Import your CSS module
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.connectWithUs}>
        <img className={styles.image} src="/images/footer-image.jpg" alt="logo" width="100%" height="40%" />
        <div className={styles.overlay}>
          <div className={styles.logo}>

            <Link href="/recipes/1">
              <div className={styles.logoContainer}>
                <img src="/images/BrandLogo.png" alt="Logo" width="100%" />
              </div>
            </Link>
          </div>

          <div className={styles.connectContent}>
            <input type="email" placeholder="Enter your email" />
            <button>Connect with Us</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
