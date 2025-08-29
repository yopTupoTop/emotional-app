import React from "react";
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <section id="hero" className={styles.heroSection}>
      <h1 className={styles.heroTitle}>EMOTIONAL HELPER</h1>
    </section>
  );
}

export default HeroSection;
