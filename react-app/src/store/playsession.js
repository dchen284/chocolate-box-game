// constants
// const GET_ONE_PLAY_SESSION = 'playsessino/GET_ONE_PLAY_SESSION';
const GET_PLAY_SESSIONS = 'playsession/GET_PLAY_SESSIONS';

// action creators
const getAllPlaySessions = (playSessions) => ({
    type: GET_PLAY_SESSIONS,
    payload: playSessions,
});

// const getOnePlaySession = (playSession) => ({
//     type: GET_ONE_PLAY_SESSION,
//     payload: playSession
// })

// thunk action creators

export const fetchAllPlaySessions = () => async (dispatch) => {
    //console.log('gabba');
    const response = await fetch('/api/play_sessions', {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllPlaySessions(data));
        return data;
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
const initialState = {};

export default function playSessionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLAY_SESSIONS:
            return { temp: action.payload }
        default:
            return state;
    }
}