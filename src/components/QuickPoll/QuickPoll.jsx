import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { savePollResponse } from "../../services/firebaseService";
import styles from "./QuickPoll.module.css";

function QuickPoll({
  title = "Quick Poll",
  options = ["Option 1", "Option 2", "Option 3"],
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleOptionClick = async (optionIndex) => {
    setSelectedOption(optionIndex);
    setIsLoading(true);

    try {
      if (user && user.email) {
        await savePollResponse(
          user.email,
          title,
          optionIndex,
          options[optionIndex]
        );
      }
    } catch (error) {
      console.error("Failed to save response:", error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.pollCard}>
      <h3 className={styles.pollTitle}>{title}</h3>
      {options.map((option, index) => (
        <div
          key={index}
          className={styles.pollOption}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </div>
      ))}
      {isLoading && <div className={styles.pollLoading}>● Loading...</div>}
    </div>
  );
}

export default QuickPoll;
