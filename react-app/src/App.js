// External imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Internal imports
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
// import TableDisplay from './components/datatables/TableDisplay';
import TableBoards from './components/datatables/TableBoards';
import TableFavorites from './components/datatables/TableFavorites';
import TablePlaySessions from './components/datatables/TablePlaySessions';
import PlaySessionDetails from './components/playsession/PlaySessionDetails';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import GameDisplay from './components/game/GameDisplay';
import { authenticate } from './store/session';
import './index.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="page-container">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          {/* <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route> */}
          {/* <ProtectedRoute path='/users' exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute> */}
          <ProtectedRoute path='/' exact={true} >
            {/* <h1>My Home Page</h1> */}
            <GameDisplay />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/tables' exact={true} >
            <TableDisplay />
          </ProtectedRoute> */}
          <ProtectedRoute path='/boards' exact={true} >
            <TableBoards />
          </ProtectedRoute>
          <ProtectedRoute path='/boards/:boardId' exact={true} >
            <TablePlaySessions />
          </ProtectedRoute>
          <ProtectedRoute path='/favorites' exact={true} >
            <TableFavorites />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId/playsessions' exact={true} >
            <TablePlaySessions />
          </ProtectedRoute>
          <ProtectedRoute path='/playsession/:playSessionId(\d+)'>
            <PlaySessionDetails />
          </ProtectedRoute>
          <Route>
            404: Geez.
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
