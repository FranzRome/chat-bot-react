import React, { act } from "react";
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../slices/chatSlice';
import ChatWindow from '../../components/ChatWindow';
import { clearChatHistory } from "../../utils/localStorage";


jest.mock('../../components/MessageInput', () => (props) => (
  <button onClick={() => props.onSend('Test message')}>Send</button>
));
jest.mock('../../components/Message', () => ({ text, user }) => (
  <div>{user}: {text}</div>
));

const getStore = (initialState) =>
  configureStore({
    reducer: {
      chat: chatReducer,
    },
    preloadedState: initialState,
  });

const renderComponent = (store) =>
    render(
      <Provider store={store}>
        <ChatWindow />
      </Provider>
    );

describe('ChatWindow', () => {
  test('renders initial message if no messages are present', async () => {
    const store = getStore({ chat: { messages: [], loading: false } });

    renderComponent(store);
    await new Promise((r) => setTimeout(r, 3000));

    expect(screen.getByText('bot: Hello, how can I help you?')).toBeInTheDocument();
  });

  test('displays messages from the store', () => {
    const store = getStore({
      chat: {
        messages: [{ text: 'Hello', user: 'user' }],
        loading: false
      }
    });

    renderComponent(store);
    clearChatHistory();

    expect(screen.getByText('user: Hello')).toBeInTheDocument();
  });

  test('shows loading indicator when loading is true', () => {
    const store = getStore({
      chat: {
        messages: [{ text: 'Hello', user: 'user' }],
        loading: true
      }
    });

    renderComponent(store);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});