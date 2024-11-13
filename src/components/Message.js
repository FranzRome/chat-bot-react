import React from 'react';

// Functional component to render individual messages
const Message = ({ text, user }) => (
  // eslint-disable-next-line jsx-a11y/aria-role
  <div className={`message ${user}`} role="container"> 
    {/* Display "You" if the message is from the user, otherwise display "Bot" */}
    <span>{user === 'user' ? 'You' : 'Bot'}: {text}</span>
  </div>
);

export default Message;
