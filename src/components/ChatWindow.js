import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recieveMessage, addMessage } from '../slices/chatSlice';
import MessageInput from './MessageInput';
import Message from './Message';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  const handleSendMessage = (text) => {
    if (!error) {
      dispatch(addMessage({ text, user: 'user' }));
      dispatch(recieveMessage(text));
    }
  };

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
        {loading && <p>Loading...</p>}
        {error && <p className = 'error'>There was an error, <u>press F5</u> to reload the application</p> /* Error handling user side */}
        {error && console.log(error) /* Error handling developer side */}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
