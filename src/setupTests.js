// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
