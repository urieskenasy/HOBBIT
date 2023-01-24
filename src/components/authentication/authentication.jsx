import { useState, useContext } from 'react';

import { SignUpForm } from './sign-up/sign-up-form';
import { SignInForm } from './sign-in/sign-in-form';
import Intro from './intro'

import Button from '../UI/Button';
import PopUp from '../pop-up/pop-up';

import { UserContext } from '../../context/user.context';

import './authentication.styles.scss'

const Authentication = () => {
    const { currentUser } = useContext(UserContext);
    const [toggle, setToggle] = useState(false);

    const togglePopUp = () => {
        setToggle(!toggle)
    }

    // if(currentUser) {
    //     window.location.replace('/home')
    //   }

    // console.log(toggle);

    return (
        <div className='authentication-container'>
            <Intro />
            <div className='form-container'>
            <div className='logo'>
                <h1 id='logo'>Hobbyt</h1>
                {/* <RiBubbleChartFill/> */}
                </div>
                <SignInForm />
                <Button className='register' onClick={togglePopUp} name="Register"/>
            </div>
            { toggle ? <PopUp toggle={togglePopUp} content={<SignUpForm />}/> : null }
        </div>
    )
}

export default Authentication;
