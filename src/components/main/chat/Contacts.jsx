
import React, { useContext, useState, useEffect } from "react";

import { collection, getDocs, getDoc, doc,updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase.utils";

import { ChatContext } from "../../../context/ChatProvider";
import { UserContext } from "../../../context/user.context";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillChatDotsFill } from "react-icons/bs";

import "./style/contacts.scss";
import "./contacts.styles.scss";

function Contacts() {
  const { room, joinRoom, chatDocs } = useContext(ChatContext);
  const { currentUser, contacts, setContacts } =
  useContext(UserContext);
  const [users, setUsers] = useState([]);
  const userCollection = collection(db, 'users');
  console.log(contacts, 'this is contacts!!');

  const [userData, setUserData] = useState([]);
  

  const UpdateNotifications = ({email}) => {
   
    const chat = chatDocs?.find(
      (doc) => 
          (doc?.doc?.receiver === email)
  );
    const unreadMessages = chat?.doc?.messages?.filter(message => message.isRead === false).length;
  console.log(unreadMessages, 'update notifications');


    return (<span>{unreadMessages === 0 ? <span></span> : <span>{unreadMessages}</span>}</span>)
  }

  useEffect(() => {
    const docRef = doc(db, 'users', currentUser.uid);
    const gettingUser = async () => {
      const data = await getDoc(docRef);
      setUserData(data.data());
      const dataContacts = data.data();
      dataContacts.contacts && setContacts(dataContacts.contacts);
    };

    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    gettingUser();
    getUsers();
  }, [currentUser]);

  console.log(room, 'this is room');

  const handleDeleteFromContacts = (index) => {
    const updatedContacts = contacts.filter((contact, i) => index !== i);
    setContacts(updatedContacts);
    const updatedUser = userData;
    updatedUser.contacts = updatedContacts;
    const updateUser = async () => {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, updatedUser);
    };
    updateUser();
    // setRoom(false);
  };

  return (
    <ul>
      {contacts
        ?.filter((contact, i) => {
          return contact.email !== currentUser?.email;
        })
        .map((user, index) => (
          <li key={index} className="contacts-li">
          <img
              src={user.userData?.image}
              onClick={() => joinRoom(user.email)}
              alt='contact'
          />
          <p onClick={() => joinRoom(user.email)}>
              {user.displayName ? user.displayName : user.email}
          </p>
          <button onClick={() => handleDeleteFromContacts(index)}>
              <BsFillTrashFill className="btn-trash-icon icon" />
          </button>
          <button
              className="btn-letsChat-icon icon"
              style={{ cursor: "pointer" }}
              onClick={() => joinRoom(user.email)}
            >
              <BsFillChatDotsFill /><span>{chatDocs && <UpdateNotifications email={user.email}/>}</span>
            </button>
          </li>
        ))}
    </ul>
  );
        }

export default Contacts;