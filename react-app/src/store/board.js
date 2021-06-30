// constants
const GET_BOARDS = 'board/GET_BOARDS';

// action creators
const getAllBoards = (boards) => ({
    type: GET_BOARDS,
    payload: boards,
});

// thunks
export const fetchAllBoards = () => async (dispatch) => {
    const response = await fetch('/api/boards', {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllBoards(data));
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

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return { temp: action.payload }
        default:
            return state;
    }
}