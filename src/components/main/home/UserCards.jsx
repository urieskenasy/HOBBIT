import React, { useContext } from 'react';
import { UserContext } from '../../../context/user.context';
import UserCard from './UserCard';

function UserCards() {
  const { currentUser, sortedUsers} =
    useContext(UserContext);

  return (
    <>
    <h2 className='search-heading'>Some great people in your area</h2>
      <div className='card-container'>
        {sortedUsers
          ?.filter((i) => i.email !== currentUser?.email)
          .map((user, key) => {
            return (
              <UserCard
                key={key}
                name={user.displayName}
                imgUrl={user.userData.image}
                hobbies={user.userData.hobbies}
                contactId={user.id}
                user={user}
                message={user.userData.message}
                age={user.userData.age}
                location={user.userData.location}
            >
                {user.displayName}
              </UserCard>
            );
          })}
      </div>
    </>
  );      
}
export default UserCards;
