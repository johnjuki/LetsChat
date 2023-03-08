import React from 'react';
import ProfilePic from '../img/ProfilePic.jpg';

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">LetsChat</span>
      <div className="user">
        <img src={ProfilePic} alt="" />
        <span>John</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar