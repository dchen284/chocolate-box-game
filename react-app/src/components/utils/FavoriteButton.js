//External Imports
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//Internal Imports
import * as favoritePlayerActions from '../../store/favorite_player';
import './FavoriteButton.css';

const FavoriteButton = ({loggedInUserId, favoriteId}) => {

    // hooks and state variables
    const dispatch = useDispatch();
    const [isSelf, setIsSelf] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const favoritePlayers = useSelector(state => state.favoritePlayers);
    // const loggedInUser = useSelector((state) => state.session.user);

    // useEffects
    useEffect(() => {
        if (favoritePlayers[favoriteId]) {setIsFavorite(true)}
        if (+loggedInUserId === +favoriteId) {setIsSelf(true)}
    }, [favoriteId, favoritePlayers, loggedInUserId]);

    // functions
    const deleteFavorite = (userId, favoriteId) => {
        dispatch(favoritePlayerActions.fetchDeleteFavorite(userId, favoriteId))
    }

    const addFavorite = (userId, favoriteId) => {
        dispatch(favoritePlayerActions.fetchAddFavorite(userId, favoriteId))
    }

    // JSX

    if (isSelf) {
        return null;
    }

    // if (isFavorite) {
        return (
            <span>
                <button
                className="button-favorite"
                onClick={()=> {
                    if (isFavorite) {
                        deleteFavorite(loggedInUserId, favoriteId);
                        setIsFavorite(false);
                    }
                    else {
                        addFavorite(loggedInUserId, favoriteId)
                        setIsFavorite(true);
                    }
                }}
                >
                    <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
            </span>
        )
    // }
    // else {
    //     return (
    //         <span>
    //             <button className="button-favorite">
    //                 <i
    //                 className="far fa-heart"
    //                 onClick={()=> {
    //                     addFavorite(loggedInUserId, favoriteId)
    //                     setIsFavorite(true);
    //                 }}
    //                 ></i>
    //             </button>
    //         </span>
    //     )
    // }


}

export default FavoriteButton;