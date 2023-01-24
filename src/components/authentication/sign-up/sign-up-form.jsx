import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createUserDocumentFromAuth,
  createUserAuthWithEmailAndPassword,
} from '../../../utils/firebase/firebase.utils';

import FormInput from '../../form-input/form-input';
import Button from '../../UI/Button';

import './sign-up-form.styles.scss';

import Context from '../../../context/contextProvider';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const { onEditHandler } = useContext(Context);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Your passwords don't match!");
      return;
    }

    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      onEditHandler();
      navigate('/profile');
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Register here</h2>
      <form 
        onSubmit={handleSubmit}
        className='form-container'
      >
        <FormInput
          label='Username'
          type='text'
          name='displayName'
          required
          onChange={handleChange}
        />

        <FormInput
          label='Email'
          type='email'
          name='email'
          required
          defaultValue={email}
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          type='password'
          name='password'
          required
          defaultValue={password}
          onChange={handleChange}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          required
          defaultValue={confirmPassword}
          onChange={handleChange}
        />
        <Button 
          name="Sign Up" 
          type='submit' 
          className="sign-up-btn"
        />
      </form>
    </div>
  );
};
