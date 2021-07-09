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
import './components/index.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // const user = useSelector((state) => state.session.user);

  if (!loaded) {
    return null;
  }

  return (
    <div className="page-container">
      {/* <div className="content-wrap"> */}
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
              <h1>404: Not Found</h1>
              <h3>You seem to have wandered off, away from the Wonka tour.</h3>
              <h3>You do remember what happens if you don't follow the tour, yes?</h3>
              <h3>Hit Refresh if you think you're in the right place,</h3>
              <h3>or hit Back to return where you came from.</h3>
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      {/* </div> */}
    </div>
  );
}

export default App;
