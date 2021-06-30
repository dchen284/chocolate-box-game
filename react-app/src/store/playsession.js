// constant
const GET_PLAY_SESSIONS = 'playsession/GET_PLAY_SESSIONS';

//action creator
const getAllPlaySessions = (playSessions) => ({
    type: GET_PLAY_SESSIONS,
    payload: playSessions,
});

//thunks

export const fetchAllPlaySessions = () => async (dispatch) => {
    console.log('gabba');
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

const initialState = {};

export default function playSessionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLAY_SESSIONS:
            return { temp: action.payload }
        default:
            return state;
    }
}