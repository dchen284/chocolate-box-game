
// External imports
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
// Internal imports
// import * as sessionActions from '../store/session';

const NavBar = () => {

  // hooks and state variables
  // const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  // useEffects


  // JSX
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/boards' exact={true} activeClassName='active'>
            Boards
          </NavLink>
        </li>
        <li>
          <NavLink to='/favorites' exact={true} activeClassName='active'>
            Favorite Players
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user?.id}/playsessions`} exact={true} activeClassName='active'>
            Your Play Sessions
          </NavLink>
        </li>
        <li>
          <NavLink to='/playsession/1' exact={true} activeClassName='active'>
            Play Session 1
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
