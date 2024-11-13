export const getBotResponse = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ text: message, user: 'bot' });
    }, Math.floor(Math.random() * 2000));
  });
};
