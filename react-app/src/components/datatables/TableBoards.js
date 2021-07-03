//External Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//Internal Imports
import * as boardActions from '../../store/board';

const TableBoards = () => {

    //hooks and state variables
    const dispatch = useDispatch();
    // const [isLoadedButNotFound, setIsLoadedButNotFound] = useState(false);
    const boards = useSelector((state) => state.boards);
    const boardsValues = Object.values(boards);

    //useEffects
    useEffect(() => {
        dispatch(boardActions.fetchAllBoards());
    }, [dispatch]);

    // useEffect(() => {
    //     if (boards && !boardsValues.length) {
    //         setIsLoadedButNotFound(true);
    //     }
    // }, [boards, boardsValues]);

    //functions
    const oddIndexForPureTable = (index) => {
        if (index % 2 === 1) {return 'pure-table-odd'}
        else {return 'pure-table-even'}
    }

    const formatDate = (timestamp) => {
        return timestamp.slice(timestamp.indexOf(",")+2, timestamp.indexOf(",") + 13);
    }


    //JSX

    // if (!boardsValues.length) {
    //     return (
    //         <div>404: We couldn't find anything for this ID number.</div>
    //     )
    // }

    return (
        <div className="tabledisplay_container">
            <div className="tabledisplay_text">
                <h1>Boards</h1>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date Released</th>
                            <th>Leaderboard</th>
                            <th>Board Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardsValues?.map( (board, index) => {
                        return (
                            <tr key={board.id} className={oddIndexForPureTable(index)}>
                                <td>{board.id}</td>
                                <td>{formatDate(board.timestamp)}</td>
                                <td><Link to={`/boards/${board.id}`}>Leaderboard</Link></td>
                                <td>{board.initialBoardSetup}</td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableBoards;