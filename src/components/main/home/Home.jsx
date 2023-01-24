import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import UserCards from './UserCards';
import SearchBar from './SearchBar';
import NoHobbisYet from './NoHobbisYet';
import './style/home.scss';
import {RiBubbleChartFill} from'react-icons/ri';
import {FaUserFriends} from 'react-icons/fa';

function Home() {
  const { currentUser, hobbies } = useContext(UserContext);
  
  
  return (
    <div className='home'>
      <div className='home-header'>
        <div className='logo'>
          <h1 id='logo'>Hobbyt</h1>
           {/* <RiBubbleChartFill/> */}
        </div>
      </div>
      {hobbies ? (
        <>
          <SearchBar />
          <UserCards />
        </>
      ) : <NoHobbisYet/>}
    </div>
  );
}

export default Home;
