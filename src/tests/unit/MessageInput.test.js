import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import MessageInput from '../../components/MessageInput';
import { clearChat } from '../../slices/chatSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('MessageInput component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  test('renders input and buttons correctly', () => {
    render(<MessageInput onSend={() => {}} />);

    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText(/send/i);
    const clearButton = screen.getByText(/clear/i);

    expect(input).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test('sends message when form is submitted', () => {
    const onSendMock = jest.fn();
    render(<MessageInput onSend={onSendMock} />);

    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText(/send/i);

    fireEvent.change(input, { target: { value: 'Hello world' } });
    fireEvent.click(sendButton);

    expect(onSendMock).toHaveBeenCalledWith('Hello world');
    expect(input.value).toBe('');  // Check that the input is cleared
  });

  test('clears chat when clear button is clicked', () => {
    render(<MessageInput onSend={() => {}} />);

    const clearButton = screen.getByText(/clear/i);
    fireEvent.click(clearButton);

    expect(dispatchMock).toHaveBeenCalledWith(clearChat());
  });
});
