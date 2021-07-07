
// External imports
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
// Internal imports
// import * as sessionActions from '../store/session';
import { logout } from '../store/session';
import './NavBar.css';

const NavBar = () => {

  // hooks and state variables
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  // functions
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  // JSX
  return (
    <nav>
      <div className="navbar-container">
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        {/* <div className="navbar-element">
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div> */}
        {/* <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <div>
          <NavLink to='/boards' exact={true} activeClassName='active'>
            Boards
          </NavLink>
        </div>
        <div>
          <NavLink to='/favorites' exact={true} activeClassName='active'>
            Favorite Players
          </NavLink>
        </div>
        <div>
          <NavLink to={`/users/${user?.id}/playsessions`} exact={true} activeClassName='active'>
            Your Play Sessions
          </NavLink>
        </div>
        {/* <li>
          <NavLink to='/playsession/1' exact={true} activeClassName='active'>
            Play Session 1
          </NavLink>
        </li> */}
        <div>
          <div onClick={onLogout} className="navbar-logout">
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
