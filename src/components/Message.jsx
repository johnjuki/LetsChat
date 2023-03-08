import React from 'react';
import ProfilePic from '../img/ProfilePic.jpg';

const Message = () => {
  return (
    <div className="message owner">
      <div className="message-info">
        <img src={ProfilePic} alt="" />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>Hello</p>
        <img src={ProfilePic} alt="" />
      </div>
    </div>
  )
}

export default Message
