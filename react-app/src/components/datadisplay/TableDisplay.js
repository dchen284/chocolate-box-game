//External Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//Internal Imports
import * as boardActions from '../../store/board';
import * as playSessionActions from '../../store/playsession';
import './TableDisplay.css';

const TableDisplay = () => {

    //hooks and state variables
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const boardsValues = Object.values(boards);
    const playSessions = useSelector((state) => state.playSessions);
    const playSessionsValues = Object.values(playSessions);

    useEffect(() => {
        dispatch(boardActions.fetchAllBoards());
        dispatch(playSessionActions.fetchAllPlaySessions());
    }, [dispatch]);

    return (
        <div className="tabledisplay_container">
            <div className="tabledisplay_text">
                <h1>TableDisplay</h1>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Board Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardsValues?.map( board => {
                        return (
                            <tr key={board.id}>
                                <td>{board.id}</td>
                                <td>{board.initialBoardSetup}</td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>

                {playSessionsValues ? <div>{playSessionsValues}</div> : null}
            </div>
            <table className="right-pure-table pure-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="pure-table-odd">
                        <td>1</td>
                        <td>Honda</td>
                        <td>Accord</td>
                        <td>2009</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Toyota</td>
                        <td>Camry</td>
                        <td>2012</td>
                    </tr>
                    <tr className="pure-table-odd">
                        <td>3</td>
                        <td>Hyundai</td>
                        <td>Elantra</td>
                        <td>2010</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Ford</td>
                        <td>Focus</td>
                        <td>2008</td>
                    </tr>
                    <tr className="pure-table-odd">
                        <td>5</td>
                        <td>Nissan</td>
                        <td>Sentra</td>
                        <td>2011</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>BMW</td>
                        <td>M3</td>
                        <td>2009</td>
                    </tr>
                    <tr className="pure-table-odd">
                        <td>7</td>
                        <td>Honda</td>
                        <td>Civic</td>
                        <td>2010</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Kia</td>
                        <td>Soul</td>
                        <td>2010</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableDisplay;