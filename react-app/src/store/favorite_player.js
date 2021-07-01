// constants

const ADD_FAVORITE = 'favorite_players/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorite_players/DELETE_FAVORITE';
const GET_FAVORITES_OF_USER = 'favorite_players/GET_FAVORITES_OF_USER';

// action creators

const addFavorite = (favorite_user) => ({
    type: ADD_FAVORITE,
    payload: favorite_user,
})

const deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITE,
    payload: favoriteId,
});

const getFavoritesOfUser = (favorite_players) => ({
    type: GET_FAVORITES_OF_USER,
    payload: favorite_players,
});





// thunk action creators

export const fetchAllFavoritesOfUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorite_players`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getFavoritesOfUser(data.favorite_players));
        return data.favorite_players;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

export const fetchAddFavorite = (userId, favoriteId) => async (dispatch) => {
    console.log('here')
    const response = await fetch(`/api/users/${userId}/favorite_players/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(favoriteId),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addFavorite(data));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

export const fetchDeleteFavorite = (userId, favoriteId) => async (dispatch) => {
    console.log('here')
    const response = await fetch(`/api/users/${userId}/favorite_players/${favoriteId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        dispatch(deleteFavorite(favoriteId));
        return;
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

export default function favoritesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_FAVORITE:
            newState = { ...state };
            const newFavorite = action.payload;
            newState[action.payload.id] = newFavorite;
            return newState;
        case DELETE_FAVORITE:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        case GET_FAVORITES_OF_USER:
            newState = {};
            const favoritePlayers = action.payload;
            favoritePlayers.forEach(favoritePlayer => newState[favoritePlayer.id] = favoritePlayer)
            return newState;
        default:
            return state;
    }
}
