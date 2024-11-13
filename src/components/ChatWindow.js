import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recieveMessage, addMessage } from '../slices/chatSlice';
import MessageInput from './MessageInput';
import Message from './Message';

// ChatWindow component manages chat messages and user interactions
const ChatWindow = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages); // Fetches messages from Redux store
  const loading = useSelector((state) => state.chat.loading); // Loading state
  const error = useSelector((state) => state.chat.error); // Error state

  // Handles sending a message: dispatches user message and triggers bot response
  const handleSendMessage = (text) => {
    if (!error) { 
      dispatch(addMessage({ text, user: 'user' })); // Adds user message
      dispatch(recieveMessage(text)); // Triggers bot reply
    }
  };

  // Runs only on initial render; sends a welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      dispatch(recieveMessage('Hello, how can I help you?'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-window">
      <div className="messages">
        {
          messages.map((msg, index) => {
            return <Message key={index} text={msg.text} user={msg.user} />
          })
        }
        {loading && <p>Loading...</p> /* Shows loading state */} 
        {error && <p className = 'error'>There was an error, <u>press F5</u> to reload the application</p> /* Error handling user side */}
        {error && console.log(error) /* Error handling developer side */}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
