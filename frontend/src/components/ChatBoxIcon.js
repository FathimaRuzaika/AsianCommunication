import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatBoxIcon() {
  return (
    <div>
      <Link to="/chat">
        <img
          src="../images/chatbot-icon.png"
          alt="Chatbot icon"
          style={{
            width: '120px',
            height: '120px',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '9999',
          }}
        />
      </Link>
    </div>
  );
}
