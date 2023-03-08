import React from 'react';
import ProfilePic from '../img/ProfilePic.jpg';

const Search = () => {
  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" />
      </div>
      <div className="user-chat">
        <img src={ProfilePic} alt="" />
        <div className="user-chat-info">
          <span>Isabella</span>
        </div>
      </div>
    </div>
  )
}

export default Search