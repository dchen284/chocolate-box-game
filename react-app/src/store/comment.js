//constants

const GET_COMMENTS_OF_PLAY_SESSION = 'comments/GET_COMMENTS_OF_PLAY_SESSION';


// action creators

const getCommentsOfPlaySession = (comments) => ({
    type: GET_COMMENTS_OF_PLAY_SESSION,
    payload: comments,
})


// thunk action creators

export const fetchCommentsOfPlaySession = (playSessionId) => async (dispatch) => {
    const response = await fetch(`/api/play_sessions/${playSessionId}/comments`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        console.log('+++++++++++', data)
        dispatch(getCommentsOfPlaySession(data.comments));
        return data.comments;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

// reducer
const initialState = {};

export default function playSessionsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_COMMENTS_OF_PLAY_SESSION:
            newState = {};
            const comments = action.payload;
            comments.forEach(comment => newState[comment.id] = comment)
            return newState;
        default:
            return state;
    }
}