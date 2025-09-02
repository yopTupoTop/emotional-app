import React from "react";
import TrackSection from "../../components/TrackSection/TrackSection";
import StatisticSection from "../../components/StatisticSection/StatisticSection";
import QuickPoll from "../../components/QuickPoll/QuickPoll";
import PieChart from "../../components/PieChart/WeeklyPieChart";
import { useLocation } from "react-router-dom";
import styles from "./Track.module.css";
import { useAuth } from "../../context/AuthContext";

function Track() {
  const location = useLocation();
  //const userEmail = location.state?.email || "";
  const { userEmail } = useAuth();
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
        <StatisticSection userEmail={userEmail} />
      </section>
      <button className={styles.arrowUp} onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}

export default Track;
