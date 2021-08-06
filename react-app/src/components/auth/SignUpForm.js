import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginPage.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
    // }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="form-container">
      <div className="error-container">
        {errors.map((error, ind) => (
          <div className="error-display" key={ind}>{error}</div>
        ))}
      </div>
      <h3 className='form-title'>Sign Up For a New Account!</h3>
      <div className='form-line'>
        <label className='form-label'>User Name</label>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='form-line'>
        <label className='form-label'>Email</label>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='form-line'>
        <label className='form-label'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='form-line'>
        <label className='form-label'>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          placeholder='Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
        ></input>
      </div>
      <div className='form-line'>
        <button className="button-signup-form button-chocolate" type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
