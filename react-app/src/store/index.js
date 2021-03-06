// External imports
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// Internal imports
import boardsReducer from './board';
import commentsReducer from './comment';
import errorsReducer from './error';
import favoritesReducer from './favorite_player';
import playSessionsReducer from './playsession';
import session from './session'

const rootReducer = combineReducers({
  boards: boardsReducer,
  comments: commentsReducer,
  errors: errorsReducer,
  favoritePlayers: favoritesReducer,
  playSessions: playSessionsReducer,
  session,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
