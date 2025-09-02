import { getWeeklyResponsesByPoll } from "../services/pollService";

export const useWeeklyResponsesByPoll = (userEmail, pollTitle) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEmail || !pollTitle) {
      setResponses([]);
      setLoading(false);
      return;
    }

    const fetchweeklyResponses = async () => {
      try {
        setLoading(true);
        const data = await getWeeklyResponsesByPoll(userEmail, pollTitle);
        setResponses(data);
        setError(null);
      } catch (error) {
        setError(error);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchweeklyResponses();
  }, [userEmail, pollTitle]);

  return { responses, loading, error };
};
