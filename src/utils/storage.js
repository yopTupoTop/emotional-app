const STORAGE_KEY = 'emotional_app_responses';

export const saveResponse = (userEmail, pollTitle, selectedOption, optionText) => {
  const responses = getStoredResponses();
  
  const newResponse = {
    id: Date.now(),
    userEmail,
    pollTitle,
    selectedOption,
    optionText,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString()
  };
  
  responses.push(newResponse);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  
  return newResponse;
};

export const getStoredResponses = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading responses from storage:', error);
    return [];
  }
};

export const getUserResponses = (userEmail) => {
  const allResponses = getStoredResponses();
  return allResponses.filter(response => response.userEmail === userEmail);
};

export const getResponsesByDate = (userEmail, date) => {
  const userResponses = getUserResponses(userEmail);
  return userResponses.filter(response => response.date === date);
};

export const clearUserResponses = (userEmail) => {
  const allResponses = getStoredResponses();
  const filteredResponses = allResponses.filter(response => response.userEmail !== userEmail);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResponses));
};