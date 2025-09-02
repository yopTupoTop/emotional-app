import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const COLLECTION_NAME = "poll_responses";

export const getWeeklyResponsesByPoll = async (userEmail, pollTitle) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, COLLECTION_NAME),
      where("userEmail", "==", userEmail),
      where("pollTitle", "==", pollTitle),
      where("timestamp", ">=", Timestamp.fromDate(weekAgo)),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const responses = [];

    querySnapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      });
    });

    return responses;
  } catch (error) {
    console.error("Error getting weekly responses by poll:", error);
    throw error;
  }
};

export const getUserPolls = async (userEmail) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userEmail", "==", userEmail),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const polls = new Set();

    querySnapshot.forEach((doc) => {
      polls.add(doc.data().pollTitle);
    });

    return Array.from(polls);
  } catch (error) {
    console.error("Error getting user polls:", error);
    throw error;
  }
};
