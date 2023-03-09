import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Search = () => {
  const { currentUser } = useContext(AuthContext);

  const [userName, setUserName] = useState();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Check whether group (chats in firestore) exists,  if not create.
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    try {
      const combinedIdQuerySnapshot = await getDoc(doc(db, "chats", combinedId));
      if (!combinedIdQuerySnapshot.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // update userChats collection for the current user.
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        // update the userChats collection for the other user.
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });

      }
    } catch (error) {
      console.log(error);
      setErr(true);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="search-form">
        <input type="text" placeholder="Find a user" value={userName} onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="user-chat-info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
};

export default Search;
