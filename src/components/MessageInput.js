import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearChat } from '../slices/chatSlice';

const MessageInput = ({ onSend }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(''); // State to manage the input field value

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {  // Check if input is not just whitespace
      onSend(input);  // Call the onSend function passed as prop
      setInput('');  // Clear the input field after sending
    }
  };

  // Dispatch action to clear the chat
  const handleClearChat = () => {
    dispatch(clearChat());
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={input}  // Bind input state to the input field
        onChange={(e) => setInput(e.target.value)}  // Update input state on change
        placeholder="Type a message..."
      />
      <button type="submit" className="send-message"><i className="fa fa-paper-plane"/>Send</button>
      <button onClick={handleClearChat} className="clear-chat"><i className="fa fa-trash"/>Clear</button>
    </form>
  );
};

export default MessageInput;
