import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  db,
} from '../utils/firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';

import useLocalStorage from 'use-local-storage';

//actual value you want to access
export const UserContext = createContext({
    createUser: null,
    setCurrentUser: () => null,
});

const userCollection = collection(db, "users");

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  //from eszter
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [users, setUsers] = useLocalStorage('users', []);
  // hobbies of the current user
  const [hobbies, setHobbies] = useState([]);
  // const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [contacts, setContacts] = useState([]);
  // Array of ticked checkboxes
  const [query, setQuery] = useLocalStorage('query', hobbies);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const defaultSortedUsers = () => {
        const filteredUsers = users?.filter(
          (user) =>
            user?.userData?.hobbies?.some((hobby) => hobby) &&
            user.id !== currentUser.uid
        );
        setContacts(currentUser.contacts);
        setSortedUsers(filteredUsers);
      };

      defaultSortedUsers();
    }
  }, [users]);

  console.log(sortedUsers, 'sorted users');



    const value = {
        currentUser,
        setCurrentUser,
        users,
        hobbies,
        setHobbies,
        query,
        setQuery,
        sortedUsers,
        contacts,
        setContacts,
    };
    // const value = { currentUser, setCurrentUser, users };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollection);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    // Hobbies

    useEffect(() => {
        if (currentUser) {
            const usersArr = users.filter((user) =>
                user?.userData?.hobbies?.some((hobby) =>
                    query.includes(hobby.toLowerCase())
                )
            );
            //   console.log('usersArr: ', usersArr)
            setSortedUsers(usersArr);
        }
    }, [query]);
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
