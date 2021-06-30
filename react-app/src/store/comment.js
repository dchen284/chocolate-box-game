//constants

const ADD_COMMENT = 'comments/ADD_COMMENT';
const GET_COMMENTS_OF_PLAY_SESSION = 'comments/GET_COMMENTS_OF_PLAY_SESSION';


// action creators

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

const getCommentsOfPlaySession = (comments) => ({
    type: GET_COMMENTS_OF_PLAY_SESSION,
    payload: comments,
});


// thunk action creators

export const fetchCommentsOfPlaySession = (playSessionId) => async (dispatch) => {
    const response = await fetch(`/api/play_sessions/${playSessionId}/comments`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
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

export const fetchAddComment = (comment) => async (dispatch) => {
    console.log('############')
    const response = await fetch(`/api/play_sessions/${comment.play_session_id}/comments`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data))
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

// reducer
const initialState = {};

export default function playSessionsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            newState = {...state}
            const newComment = action.payload;
            newState[newComment.id] = newComment;
            return newState;
        case GET_COMMENTS_OF_PLAY_SESSION:
            newState = {};
            const comments = action.payload;
            comments.forEach(comment => newState[comment.id] = comment)
            return newState;
        default:
            return state;
    }
}