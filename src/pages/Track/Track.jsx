import React from "react";
import TrackSection from "../../components/TrackSection/TrackSection";
import StatisticSection from "../../components/StatisticSection/StatisticSection";
import QuickPoll from "../../components/QuickPoll/QuickPoll";
import PieChart from "../../components/PieChart/WeeklyPieChart";
import styles from "./Track.module.css";

function Track() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.trackPage}>
      <section className={styles.trackHeader}>
        <h1 className={styles.trackTitle}>IT'S YOUR PERSONAL SPACE</h1>
        <h1 className={styles.trackTitle}>HERE YOU CAN LEARN YOUR EMOTIONS</h1>
      </section>
      <section id="track-section">
        <TrackSection />
      </section>
      <section id="statistic">
        <StatisticSection />
      </section>
      <button className={styles.arrowUp} onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}

export default Track;
