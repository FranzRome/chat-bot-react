import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearChat } from '../slices/chatSlice';

const MessageInput = ({ onSend }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleClearChat = () => {
    dispatch(clearChat());
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-message"><i className="fa fa-paper-plane"/>Send</button>
      <button onClick={handleClearChat} className="clear-chat"><i className="fa fa-trash"/>Clear</button>
    </form>
  );
};

export default MessageInput;
