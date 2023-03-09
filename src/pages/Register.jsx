import React, { useState } from 'react';
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, "avatars/" + displayName);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        (error) => {
          console.log(error);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(userCredential.user, { displayName, photoURL: downloadURL });

            const userRef = doc(db, "users", userCredential.user.uid);
            await setDoc(
              userRef,
              {
                uid: userCredential.user.uid,
                displayName,
                email,
                photoURL: downloadURL
              },
              {
                merge: true
              }
            );

            const userChatsRef = doc(db, "userChats", userCredential.user.uid);
            await setDoc(
              userChatsRef,
              {},
              {
                merge: true
              }
            );

            navigate("/");
          });
        }
      );
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className='form-container'>
      <div className="form-wrapper">
        <span className="logo">LetsChat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
