import React, { useState, useEffect, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  getWeeklyResponsesByPoll,
  getUserPolls,
} from "../../services/pollService";
import styles from "./WeeklyPieChart.module.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#8dd1e1",
  "#d084d0",
  "#ffb347",
  "#87d068",
];

export default function WeeklyPieChart({ userEmail }) {
  const [pollDataMap, setPollDataMap] = useState({});
  const [availablePolls, setAvailablePolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const updateIntervalRef = useRef(null);

  useEffect(() => {
    if (!userEmail) return;

    const fetchPolls = async () => {
      try {
        const polls = await getUserPolls(userEmail);
        setAvailablePolls(polls);
      } catch (err) {
        console.error("Error fetching polls:", err);
        setError(err.message);
      }
    };

    fetchPolls();
  }, [userEmail]);

  const fetchAllPollData = async () => {
    if (!userEmail || availablePolls.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newPollDataMap = {};
      for (const poll of availablePolls) {
        const responses = await getWeeklyResponsesByPoll(userEmail, poll);

        const optionCounts = {};
        responses.forEach((res) => {
          const option = res.optionText || res.selectedOption || "Неизвестно";
          optionCounts[option] = (optionCounts[option] || 0) + 1;
        });

        const chartData = Object.entries(optionCounts).map(([name, value]) => ({
          name,
          value,
          percentage:
            responses.length > 0
              ? ((value / responses.length) * 100).toFixed(1)
              : "0",
        }));

        newPollDataMap[poll] = {
          chartData,
          totalResponses: responses.length,
        };
      }

      setPollDataMap(newPollDataMap);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching poll data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPollData();
  }, [userEmail, availablePolls]);

  useEffect(() => {
    const setupAutoUpdate = () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);

      const checkAndUpdate = () => {
        const now = new Date();
        const isMonday = now.getDay() === 1;
        const hour = now.getHours();
        const minutes = now.getMinutes();

        if (isMonday && hour === 9 && minutes < 15) {
          fetchAllPollData();
        }
      };

      updateIntervalRef.current = setInterval(checkAndUpdate, 15 * 60 * 1000);
      checkAndUpdate();
    };

    setupAutoUpdate();
    return () =>
      updateIntervalRef.current && clearInterval(updateIntervalRef.current);
  }, [userEmail, availablePolls]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className="m-0 font-bold">{d.name}</p>
          <p className="m-0">
            Ответов: {d.value} ({d.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className={styles.loading}>🔄 Загрузка...</div>;
  if (error)
    return (
      <div className={styles.error}>
        ❌ Ошибка загрузки: {error}
        <button
          onClick={fetchAllPollData}
          className={`${styles.button} ${styles.buttonRefresh}`}
        >
          Попробовать снова
        </button>
      </div>
    );

  if (availablePolls.length === 0) {
    return <div className={styles.noData}>Нет доступных опросов</div>;
  }

  return (
    <div className={styles.container}>
      {availablePolls.map((poll) => {
        const pollData = pollDataMap[poll];
        if (!pollData || pollData.chartData.length === 0) {
          return (
            <div key={poll} className={styles.noData}>
              <div className={styles.noDataIcon}>📝</div>
              Нет данных по опросу "{poll}" за последние 7 дней
            </div>
          );
        }

        return (
          <div key={poll} className={styles.pollWrapper}>
            <h2 className={styles.pollTitle}>📊 {poll}</h2>
            <div className={styles.totalResponses}>
              Всего ответов: {pollData.totalResponses}
            </div>

            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pollData.chartData}
                    cx="50%"
                    cy="50%"
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                  >
                    {pollData.chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}

      <div className={styles.autoUpdate}>
        🔄 Данные автоматически обновляются каждый понедельник в 9:00
        {lastUpdated && (
          <span>
            {" "}
            • Последнее обновление:{" "}
            {lastUpdated.toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
