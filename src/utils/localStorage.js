const KEY = 'chatHistory';

export const saveChatHistory = (messages) => {
  localStorage.setItem(KEY, JSON.stringify(messages));
};

export const loadChatHistory = () => {
  const savedMessages = localStorage.getItem(KEY);
  return savedMessages ? JSON.parse(savedMessages) : [];
};

export const clearChatHistory = () => {
  localStorage.removeItem(KEY);
};
