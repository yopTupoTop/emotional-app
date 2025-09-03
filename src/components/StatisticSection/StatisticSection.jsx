import React from "react";
import styles from "./StatisticSection.module.css";
import WeeklyPieChart from "../PieChart/WeeklyPieChart";

function StatisticSection({ userEmail }) {
  return (
    <div className={styles.statisticSection}>
      <WeeklyPieChart userEmail={userEmail} />
    </div>
  );
}

export default StatisticSection;
