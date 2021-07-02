//External Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//Internal Imports
import * as favoritePlayerActions from '../../store/favorite_player';
import FavoriteButton from '../utils/FavoriteButton';

const TableFavorites = () => {

    // hooks and state variables
    const dispatch = useDispatch();
    const favoritePlayers = useSelector((state) => state.favoritePlayers);
    const favoritePlayersValues = Object.values(favoritePlayers);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(favoritePlayerActions.fetchAllFavoritesOfUser(user.id));
    }, [dispatch, user.id]);

    // useEffect( () => {
    //     async function blah() {
    //         console.log('testing here')
    //         const res = await fetch(`/api/users/1/favorite_players`)
    //         const data = await res.json();
    //         console.log('testing again', data)
    //     }
    //     blah();
    // }, [])

    // const deleteFavorite = (userId, favoriteId) => {
    //     dispatch(favoritePlayerActions.fetchDeleteFavorite(userId, favoriteId))
    // }

    const addFavorite = (userId, favoriteId) => {
        dispatch(favoritePlayerActions.fetchAddFavorite(userId, favoriteId))
    }

    const isIndexOdd = (index) => {
        if (index % 2 === 1) {return 'pure-table-odd'}
        else {return 'pure-table-even'}
    }

    return (
        <div className="tabledisplay_container">
            <div className="tabledisplay_text">
                <h1>Favorites</h1>
                <button
                onClick={() => addFavorite(user.id, 2)}
                >Add Marnie as Favorite</button>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unfavorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favoritePlayersValues?.map( (favoritePlayer, index) => {
                        return (
                            <tr key={favoritePlayer.id} className={isIndexOdd(index)}>
                                <td>{favoritePlayer.username}</td>
                                <td>
                                    <FavoriteButton loggedInUserId={user.id} favoriteId={favoritePlayer.id} />
                                    {/* <div>
                                        <i
                                        className="fas fa-heart"
                                        onClick={()=> deleteFavorite(user.id, favoritePlayer.id)}></i>
                                    </div> */}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableFavorites;