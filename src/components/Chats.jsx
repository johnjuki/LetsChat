import React from 'react';
import ProfilePic from '../img/ProfilePic.jpg';

const Chats = () => {
  return (
    <div className="chats">
      <div className="user-chat">
        <img src={ProfilePic} alt="" />
        <div className="user-chat-info">
          <span>Isabella</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="user-chat">
        <img src={ProfilePic} alt="" />
        <div className="user-chat-info">
          <span>Isabella</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="user-chat">
        <img src={ProfilePic} alt="" />
        <div className="user-chat-info">
          <span>Isabella</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats