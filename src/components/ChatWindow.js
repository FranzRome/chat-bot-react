import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recieveMessage, addMessage } from '../slices/chatSlice';
import MessageInput from './MessageInput';
import Message from './Message';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);

  const handleSendMessage = (text) => {
    dispatch(addMessage({ text, user: 'user' }));
    dispatch(recieveMessage(text));
  };

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(recieveMessage('Hello, how can I help you?'));
    }
  }, []);

  return (
    <div className="chat-window">
      <div className="messages">
        {
          messages.map((msg, index) => {
            return <Message key={index} text={msg.text} user={msg.user} />
          })
        }
        {loading && <p>Loading...</p>}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
