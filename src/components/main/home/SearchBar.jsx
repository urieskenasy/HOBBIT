import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../context/user.context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebase.utils';
import './style/searchBar.scss';

function SearchBar() {
  const { currentUser, setHobbies, hobbies, query, setQuery } =
    useContext(UserContext);

  //get hobbies of current user
  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser.uid);
      const getUser = async () => {
        const currentUserData = await getDoc(docRef);
        const currentHobbies = await currentUserData.data().userData.hobbies;
        setHobbies(currentHobbies);
      };
      getUser();
    }
  }, [currentUser]);
console.log(query)
  //handle change in the form
  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    let updatedArr = query.map((item) => item.toLowerCase());
    !checked
      ? (updatedArr = query.filter((hobby) => {
          console.log(hobby);
          return hobby !== value;
        }))
      : updatedArr.push(value);
    setQuery(updatedArr);
  };

  return (
    <div>
      <form className='search-bar'>
        {hobbies.map((hobby, i) => {
          return (
            <div key={i}>
              <input
                type='checkbox'
                id={hobby}
                name='hobby'
                value={hobby}
                onClick={handleHobbyChange}
                defaultChecked={true}
              />
              <label htmlFor={hobby}>{hobby}</label>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default SearchBar;
