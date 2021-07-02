// constants

const ADD_ERRORS = 'errors/ADD_ERRORS';
const CLEAR_ERRORS = 'errors/CLEAR_ERRORS';

// action creators

export const addErrors = (errors) => ({
    type: ADD_ERRORS,
    payload: errors,
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
})

// thunk action creators

// reducer

const initialState = [];

export default function errorsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_ERRORS:
            newState = [ ...action.payload ];
            return newState;
            // return state;
        case CLEAR_ERRORS:
            newState = [];
            return newState;
        default:
            return state;
    }
}