import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, loginDemoUser } from '../../store/session';
import './LoginPage.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onLoginDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(loginDemoUser());
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className="form-container">
      <div>
        {errors.map((error, ind) => (
          <div className="error-display" key={ind}>{error}</div>
        ))}
      </div>
      <h2>Log In To Play!</h2>
      <div className='form-line'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='form-line'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className='form-line'>
        {/* <button className="pure-button button-login-form" type='submit'>Login</button> */}
        <button className="button-login-form button-chocolate" type='submit'>Login</button>
      </div>
      <div className='form-line'>
        <button className="button-login-form button-chocolate" onClick={onLoginDemoUser}>Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
