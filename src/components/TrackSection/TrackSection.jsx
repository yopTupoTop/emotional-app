import React from "react";
import QuickPoll from "../QuickPoll/QuickPoll";
import styles from "./TrackSection.module.css";

function TrackSection() {
  return (
    <div className={styles.trackSection}>
      <h3 className={styles.sectionDescription}>TRACK YOUR EMOTION HERE</h3>
      <div className={styles.pollsGrid}>
        <QuickPoll
          title="How are you feeling?"
          options={["Happy", "Sad", "Anxious", "Calm"]}
        />
        <QuickPoll
          title="Energy level today?"
          options={["High energy", "Medium energy", "Low energy", "Exhausted"]}
        />
        <QuickPoll
          title="Stress level?"
          options={[
            "No stress",
            "Mild stress",
            "Moderate stress",
            "High stress",
          ]}
        />
        <QuickPoll
          title="Overall mood?"
          options={["Positive", "Neutral", "Negative", "Mixed"]}
        />
      </div>
    </div>
  );
}

export default TrackSection;
