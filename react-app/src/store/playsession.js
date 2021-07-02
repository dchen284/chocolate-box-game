// constants
// const GET_ONE_PLAY_SESSION = 'playsession/GET_ONE_PLAY_SESSION';
const GET_PLAY_SESSIONS_OF_BOARD = 'playsession/GET_PLAY_SESSIONS_OF_BOARD';
const GET_PLAY_SESSIONS_OF_USER = 'playsession/GET_PLAY_SESSIONS_OF_USER';

// action creators
const getPlaySessionsOfBoard = (playSessions) => ({
    type: GET_PLAY_SESSIONS_OF_BOARD,
    payload: playSessions,
});

const getPlaySessionsOfUser = (playSessions) => ({
    type: GET_PLAY_SESSIONS_OF_USER,
    payload: playSessions,
});

// const getOnePlaySession = (playSession) => ({
//     type: GET_ONE_PLAY_SESSION,
//     payload: playSession
// })

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
        return data.play_sessions;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.']
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
        return data.play_sessions;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

export const fetchOnePlaySession = (playSessionId) => async (dispatch) => {

}

// reducer
const initialState = {
    boardSessions: {},
    userSessions: {},
};

export default function playSessionsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PLAY_SESSIONS_OF_BOARD:
            newState = {
                boardSessions: {},
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
                userSessions: {},
            };
            const playSessionsOfUserToAdd = action.payload;
            playSessionsOfUserToAdd.forEach( play_session => {
                newState.userSessions[play_session.id] = play_session;
            });
            return newState;
        default:
            return state;
    }
}