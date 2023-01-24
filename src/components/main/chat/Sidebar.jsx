
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarContext } from '../../../context/SidebarContext';
import Conversation from './Conversation';
import Contacts from './Contacts';
import { auth } from '../../../utils/firebase/firebase.utils';

import Button from '../../UI/Button';

import { UserContext } from '../../../context/user.context';
import {ChatContext} from '../../../context/ChatProvider.js'

// for --> userDate --> here below
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebase.utils';
import Context from '../../../context/contextProvider';

import './style/sidebar.scss';
function Sidebar() {
  const { isContactsOpen } = useContext(SidebarContext);
  
  const { currentUser, sortedUsers, contacts } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const { setLoggedStatus, onEditHandler } = useContext(Context);

  const { unread, setUnread, notifications, setNotifications, joinRoom} = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser.uid);
      const gettingUser = async () => {
        const data = await getDoc(docRef);
        setUserData(data.data());
      };
      gettingUser();
    }
  }, [currentUser]);
  const handleLogout = async () => {
    console.log('hmmm');
    await auth.signOut();
    navigate('/');
    // localStorage.clear();
    setLoggedStatus(false);
  };
  // uri: get user data --> i wasn't sure if to put it in the context so i added it here to the file


  const handleNotifications = () => {
    setNotifications([]);
    setUnread(false);
  }
  return (
    
    userData?.userData && (
      <div className='sidebar-wrapper'>
        <div className='profile'>
          <Link to='/profile'>
            <img src={userData.userData?.image} alt='profile' />
          </Link>
          <div className='column'>
            <h3>{userData?.displayName} </h3>
            <Link to="/profile">
              <Button className='small-btn secondary' onClick={onEditHandler} name="Edit Profile"></Button>
            </Link>
          </div>
        </div>
        <div className='exit-button'></div>
        <div> 
        </div>
        {/* <div className="sidebar-content-container"> */}
        {isContactsOpen ? <Contacts /> : <Conversation />}
        <Button
          onClick={handleLogout}
          name='logout'
          className='sidebar-button'
        />
        <Outlet />
      </div>
    )
  );
}
export default Sidebar;
