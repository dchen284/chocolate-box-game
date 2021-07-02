//External Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
//Internal Imports
import * as playSessionActions from '../../store/playsession';

const TablePlaySessions = () => {

    //hooks and state variables
    const dispatch = useDispatch();
    const playSessionsOfBoard = useSelector((state) => state.playSessions.boardSessions);
    const playSessionsOfBoardValues = Object.values(playSessionsOfBoard).sort((a, b) => b.score - a.score);
    const playSessionsOfUser = useSelector((state) => state.playSessions.userSessions);
    const playSessionsOfUserValues = Object.values(playSessionsOfUser).sort((a, b) => b.score - a.score);
    // const user = useSelector((state) => state.session.user);
    const { boardId, userId } = useParams();

    console.log('boardId', boardId);
    console.log('userId', userId);
    console.log('playSessionsofBoardValues', playSessionsOfBoardValues);
    console.log('playSessionsofUserValues', playSessionsOfUserValues);
    useEffect(() => {
        if (boardId) {
            dispatch(playSessionActions.fetchPlaySessionsOfBoard(boardId));
        }
        if (userId) {
            dispatch(playSessionActions.fetchPlaySessionsOfUser(userId));
        }
    }, [dispatch, boardId, userId]);

    // useEffect( () => {
    //     async function blah() {
    //         console.log('testing here')
    //         const res = await fetch(`/api/users/1/favorite_players`)
    //         const data = await res.json();
    //         console.log('testing again', data)
    //     }
    //     blah();
    // }, [])


    const isIndexOdd = (index) => {
        if (index % 2 === 1) {return 'pure-table-odd'}
        else {return 'pure-table-even'}
    }

    return (
        <div className="tabledisplay_container">
            <div className="tabledisplay_text">
                <h1>Play Sessions of X</h1>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Board #</th>
                            <th>Play Session Score</th>
                        </tr>
                    </thead>
                    { boardId ?
                    <tbody>
                        {playSessionsOfBoardValues.map( (playSession, index) => {
                        return (
                            <tr key={playSession.id} className={isIndexOdd(index)}>
                                <td>{playSession.id}</td>
                                <td>{playSession.username}</td>
                                <td>{playSession.score}</td>
                            </tr>

                        )
                    })}
                    </tbody>
                    : null}
                    { userId ?
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
                    : null}
                </table>
            </div>

        </div>
    )
}

export default TablePlaySessions;

/*
                    <tbody>
                        {boardsValues?.map( (board, index) => {
                        return (
                            <tr key={board.id} className={isIndexOdd(index)}>
                                <td>{board.id}</td>
                                <td>{board.initialBoardSetup}</td>
                            </tr>

                        )
                    })}
                    </tbody>
*/