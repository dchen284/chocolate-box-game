import * as errorsActions from '../store/error';
import * as sessionActions from '../store/session';

// constants
const GET_CURRENT_PLAY_SESSION = 'playsession/GET_CURRENT_PLAY_SESSION';
const GET_PLAY_SESSIONS_OF_BOARD = 'playsession/GET_PLAY_SESSIONS_OF_BOARD';
const GET_PLAY_SESSIONS_OF_USER = 'playsession/GET_PLAY_SESSIONS_OF_USER';
const GET_SESSION_FOR_DETAILS = 'playsession/GET_SESSION_FOR_DETAILS';

// action creators
const getPlaySessionsOfBoard = (playSessions) => ({
    type: GET_PLAY_SESSIONS_OF_BOARD,
    payload: playSessions,
});

const getPlaySessionsOfUser = (playSessions) => ({
    type: GET_PLAY_SESSIONS_OF_USER,
    payload: playSessions,
});

const getCurrentSession = (playSession) => ({
    type: GET_CURRENT_PLAY_SESSION,
    payload: playSession
})

const getSessionForDetails = (playSession) => ({
    type: GET_SESSION_FOR_DETAILS,
    payload: playSession
})

// thunk action creators

export const fetchPlaySessionsOfUser = (userId) => async (dispatch) => {
    //console.log('gabba');
    const response = await fetch(`/api/users/${userId}/play_sessions`, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getPlaySessionsOfUser(data.play_sessions));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            dispatch(errorsActions.clearErrors());
            dispatch(errorsActions.addErrors(data.errors));
            return;
        }
    } else {
        dispatch(errorsActions.addErrors(['An error occured. Please try again.']));
        return;
    }
}

export const fetchPlaySessionsOfBoard = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}/play_sessions`, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getPlaySessionsOfBoard(data.play_sessions));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            dispatch(errorsActions.clearErrors());
            dispatch(errorsActions.addErrors(data.errors));
            return;
        }
    } else {
        dispatch(errorsActions.addErrors(['An error occured. Please try again.']));
        return;
    }
}

export const fetchCurrentSession = (playSessionId) => async (dispatch) => {
    const response = await fetch(`/api/play_sessions/${playSessionId}`, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getCurrentSession(data.play_session));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            dispatch(errorsActions.clearErrors());
            dispatch(errorsActions.addErrors(data.errors));
            return;
        }
    } else {
        dispatch(errorsActions.addErrors(['An error occured. Please try again.']));
        return;
    }
}

export const fetchUpdateCurrentPlaySession = (playSessionData) => async (dispatch) => {
    const response = await fetch(`/api/play_sessions/${playSessionData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(playSessionData),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getCurrentSession(data.play_session));
        dispatch(sessionActions.authenticate())
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            dispatch(errorsActions.clearErrors());
            dispatch(errorsActions.addErrors(data.errors));
            return;
        }
    } else {
        dispatch(errorsActions.addErrors(['An error occured. Please try again.']));
        return;
    }
}

export const fetchPostNewPlaySession = (boardId, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/play_sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(boardId),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getCurrentSession(data.play_session));
        dispatch(sessionActions.authenticate())
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            dispatch(errorsActions.clearErrors());
            dispatch(errorsActions.addErrors(data.errors));
            return;
        }
    } else {
        dispatch(errorsActions.addErrors(['An error occured. Please try again.']));
        return;
    }
}

export const fetchSessionForDetails = (playSessionId) => async (dispatch) => {
    const response = await fetch(`/api/play_sessions/${playSessionId}`, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getSessionForDetails(data.play_session));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            dispatch(errorsActions.clearErrors());
            dispatch(errorsActions.addErrors(data.errors));
            return;
        }
    } else {
        dispatch(errorsActions.addErrors(['An error occured. Please try again.']));
        return;
    }
}

// reducer
const initialState = {
    boardSessions: {},
    currentSession: {},
    userSessions: {},
};

export default function playSessionsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_CURRENT_PLAY_SESSION:
            newState = {
                boardSessions: {...state.boardSessions},
                currentSession: {},
                detailsSession: {...state.detailsSession},
                userSessions: {...state.userSessions},
            };
            const currentPlaySession = action.payload;
            newState.currentSession = { ...currentPlaySession };
            return newState;
        case GET_PLAY_SESSIONS_OF_BOARD:
            newState = {
                boardSessions: {},
                currentSession: {...state.currentSession},
                detailsSession: {...state.detailsSession},
                userSessions: {...state.userSessions},
            };
            const playSessionsOfBoardToAdd = action.payload;
            playSessionsOfBoardToAdd.forEach( play_session => {
                newState.boardSessions[play_session.id] = play_session;
            });
            return newState;
        case GET_PLAY_SESSIONS_OF_USER:
            newState = {
                boardSessions: {...state.boardSessions},
                currentSession: {...state.currentSession},
                detailsSession: {...state.detailsSession},
                userSessions: {},
            };
            const playSessionsOfUserToAdd = action.payload;
            playSessionsOfUserToAdd.forEach( play_session => {
                newState.userSessions[play_session.id] = play_session;
            });
            return newState;
        case GET_SESSION_FOR_DETAILS:
            newState = {
                boardSessions: {...state.boardSessions},
                currentSession: {...state.currentSession},
                detailsSession: {},
                userSessions: {...state.userSessions},
            };
            const detailsPlaySession = action.payload;
            newState.detailsSession = { ...detailsPlaySession };
            return newState;
        default:
            return state;
    }
}