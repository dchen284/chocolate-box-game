//External Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//Internal Imports
import * as favoritePlayerActions from '../../store/favorite_player';
import * as playSessionActions from '../../store/playsession';
import FavoriteButton from '../utils/FavoriteButton';

const TablePlaySessions = () => {

    //hooks and state variables
    const dispatch = useDispatch();
    // const favoritePlayers = useSelector(state => state.favoritePlayers);
    const playSessionsOfBoard = useSelector((state) => state.playSessions.boardSessions);
    const playSessionsOfBoardValues = Object.values(playSessionsOfBoard).sort((a, b) => b.score - a.score);
    const playSessionsOfUser = useSelector((state) => state.playSessions.userSessions);
    const playSessionsOfUserValues = Object.values(playSessionsOfUser).sort((a, b) => b.score - a.score);
    const loggedInUser = useSelector((state) => state.session.user);
    const { boardId, userId } = useParams();


    useEffect(() => {
        if (boardId) {
            dispatch(playSessionActions.fetchPlaySessionsOfBoard(boardId));
        }
        if (userId) {
            dispatch(playSessionActions.fetchPlaySessionsOfUser(userId));
        }
    }, [dispatch, boardId, userId]);

    useEffect(() => {
        dispatch(favoritePlayerActions.fetchAllFavoritesOfUser(loggedInUser.id));
    }, [dispatch, loggedInUser.id]);

    const isIndexOdd = (index) => {
        if (index % 2 === 1) {return 'pure-table-odd'}
        else {return 'pure-table-even'}
    }


    if (boardId) { //Display for play sessions of board
        return (
            <div className="tabledisplay_container">
                <div className="tabledisplay_text">
                    <h1>Play Sessions of Board #{boardId}</h1>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Board #</th>
                                <th>Play Session Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playSessionsOfBoardValues.map( (playSession, index) => {
                            return (
                                <tr key={playSession.id} className={isIndexOdd(index)}>
                                    <td>{playSession.id}</td>
                                    <td>{playSession.username}
                                        <FavoriteButton loggedInUserId={loggedInUser.id} favoriteId={playSession.user_id}/>
                                    </td>
                                    <td>{playSession.score}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    if (userId) { //Display for play sessions of user

        let usernameOfPage = playSessionsOfUserValues.length ? playSessionsOfUserValues[0].username : null

        return (
            <div className="tabledisplay_container">
                <div className="tabledisplay_text">
                    <h1>Play Sessions of {usernameOfPage}
                        <FavoriteButton loggedInUserId={loggedInUser.id} favoriteId={userId}/>
                    </h1>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Board #</th>
                                <th>Play Session Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playSessionsOfUserValues.map( (playSession, index) => {
                            return (
                                <tr key={playSession.id} className={isIndexOdd(index)}>
                                    <td>{playSession.id}</td>
                                    <td>{playSession.board_id}</td>
                                    <td>{playSession.score}</td>
                                </tr>

                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TablePlaySessions;
