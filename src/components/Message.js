import React from 'react';

const Message = ({ text, user }) => (
  // eslint-disable-next-line jsx-a11y/aria-role
  <div className={`message ${user}`} role="container">
    <span>{user === 'user' ? 'You' : 'Bot'}: {text}</span>
  </div>
);

export default Message;
