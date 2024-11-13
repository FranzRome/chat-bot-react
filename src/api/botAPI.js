export const getBotResponse = async (message) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.7) {
        resolve({ text: message, user: 'bot' });
      }
      else {
        reject(new Error('generic error'));
      }
    }, Math.floor(Math.random() * 2000));
  });
};
