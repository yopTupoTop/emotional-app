import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'poll_responses';

export const savePollResponse = async (userEmail, pollTitle, selectedOption, optionText) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      userEmail,
      pollTitle,
      selectedOption,
      optionText,
      timestamp: Timestamp.now(),
      date: new Date().toLocaleDateString()
    });
    
    console.log('Response saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving response:', error);
    throw error;
  }
};

export const getUserResponses = async (userEmail) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userEmail', '==', userEmail),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const responses = [];
    
    querySnapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      });
    });
    
    return responses;
  } catch (error) {
    console.error('Error getting user responses:', error);
    throw error;
  }
};

export const getResponsesByDate = async (userEmail, date) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userEmail', '==', userEmail),
      where('date', '==', date),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const responses = [];
    
    querySnapshot.forEach((doc) => {
      responses.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      });
    });
    
    return responses;
  } catch (error) {
    console.error('Error getting responses by date:', error);
    throw error;
  }
};