// External imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Internal imports
import BoardDisplay from './BoardDisplay';
// import GameSpace from './GameSpace';
import TilesDisplay from './TilesDisplay';
import * as playSessionActions from '../../store/playsession';
import './GameDisplay.css';


const GameDisplay = () => {

    // constants, state variables, and hooks

    const arrTileValues = [
        "D1", "D2", "D3", "D4", "M1", "M2", "M3", "M4", "W1", "W2", "W3", "W4",
    ]
    const numberOfRows = 5;
    const numberOfColumns = 5;

    const [boardState, setBoardState] = useState([]);
    const [currentTile, setCurrentTile] = useState("00");
    const [isLoaded, setIsLoaded] = useState(false);
    const [tilesRemaining, setTilesRemaining] = useState([]);
    const [score, setScore] = useState(0);
    const [turn, setTurn] = useState(0);

    const currentPlaySession = useSelector(state => state.playSessions.currentSession);
    const loggedInUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    // useEffects

    // sets the current session, using the logged in user's data
    useEffect( () => {
        //console.log('+++++++++++++++++++++', loggedInUser.current_session_id)
        if (!currentPlaySession.id) {
            dispatch(playSessionActions.fetchCurrentSession(loggedInUser.current_session_id));
        }
    }, [dispatch, currentPlaySession, loggedInUser]);

    // loads data from the current play session onto the browser
    useEffect( () => {
        if (currentPlaySession.moves) {
            const newBoardState = stringToBoardState(currentPlaySession.moves, numberOfRows, numberOfColumns);
            setBoardState(newBoardState);

            const newTilesRemaining = currentPlaySession.tiles.split(",");
            setTilesRemaining(newTilesRemaining);

            setScore(currentPlaySession.score);

            const newTurn = getTurnNumberFromString(currentPlaySession.moves, numberOfRows, numberOfColumns);
            setTurn(newTurn);

            setIsLoaded(true);

        }
    }, [currentPlaySession]);

    // functions

    function getTurnNumberFromString(strBoardState, numberOfRows, numberOfColumns) {
        if (strBoardState) {
            const lengthOfOneTurn = numberOfRows * numberOfColumns * 3 + 4 - 1;
            const intStartIndex = strBoardState.length - lengthOfOneTurn;
            const strLastBoardState = strBoardState.slice(intStartIndex);
            const strTurn = strLastBoardState.slice(1, 3)
            const numTurn = +strTurn;
            return numTurn;
        }
    }

    function stringToBoardState(strBoardState, numberOfRows, numberOfColumns) {
        if (strBoardState) {
            const lengthOfOneTurn = numberOfRows * numberOfColumns * 3 + 4 - 1;
            //string format:
            //T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00
            //T01:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,D1
            //number of entries is numberOfRows * numberOfColumns
            //each entry needs 3 characters (except the last one doesn't need a ,)
            //the string starts with 4 characters: `T##:`, then -1 to remove the last comma

            const intStartIndex = strBoardState.length - lengthOfOneTurn;
            // console.log('intStartIndex', intStartIndex);
            const strLastBoardState = strBoardState.slice(intStartIndex);
            const arrBoardValues = strLastBoardState.slice(4).split(',');
            // console.log('------------', arrBoardValues);
            let k = 0;

            const loadedBoardState = new Array(numberOfRows)

            for (let i = 0; i < numberOfRows; i++) {
                loadedBoardState[i] = new Array(numberOfColumns);
                for (let j = 0; j < numberOfColumns; j++) {
                    // console.log(loadedBoardState[i][j])
                    loadedBoardState[i][j] = arrBoardValues[k];
                    k++;
                }
            }

            return loadedBoardState;
        }
    }

    const getRandomTileValue = () => {
        const randomIndex = Math.floor(Math.random() * arrTileValues.length);
        // console.log('randomIndex', randomIndex);
        return arrTileValues[randomIndex];
    }

    const boardStateToString = (boardState, turn) => {
        let strOutput = "";
        if (turn < 10) {
            strOutput += `T0${turn}:`
        }
        else {
            strOutput += `T${turn}:`
        }
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                // console.log(boardState[i][j])
                strOutput += `${boardState[i][j]},`;
            }
        }
        strOutput = strOutput.slice(0, strOutput.length - 1);
        console.log('strOutput', strOutput); //78 characters long
        return strOutput;
    }


    const createDeepCopyOfBoardState = () => {
        const copy = new Array(numberOfRows)

        for (let i = 0; i < numberOfRows; i++) {
            copy[i] = new Array(numberOfColumns);
            for (let j = 0; j < numberOfColumns; j++) {
                copy[i][j] = "00"
            }
        }

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                copy[i][j] = boardState[i][j];
            }
        }
        return copy;
    }

    const getNeighbors = (row, col) => {
        const neighbors = [];
        if (0 <= row - 1) {neighbors.push([row-1, col])}
        if (0 <= col - 1) {neighbors.push([row, col-1])}
        if (row+1 < numberOfRows) {neighbors.push([row+1, col])}
        if (col+1 < numberOfColumns) {neighbors.push([row, col+1])}

        return neighbors;

    }

    const checkLegalSpace = (row, col) => {
        let boolIsLegal = true;
        const neighbors = getNeighbors(row, col);
        const currSpace = boardState[row][col];

        //if the space is already occupied, the move is not legal
        if (currSpace !== "00") {
            // console.log('spaces occupied')
            boolIsLegal = false
        };

        //if the space's neighbors are all empty (00), the move is not legal
        let allNeighborsEmpty = true;
        neighbors.forEach( neighbor => {
            const [neighborRow, neighborCol] = neighbor;
            const neighborValue = boardState[neighborRow][neighborCol];
            if (neighborValue !== "00") {allNeighborsEmpty = false}
        });
        if (allNeighborsEmpty) {
            // console.log('all neighbors empty')
            boolIsLegal = false
        };

        //for each space's occupied neighbors, if either the letter or number do not match, the move is not legal

        neighbors.forEach( neighbor => {
            const [neighborRow, neighborCol] = neighbor;
            const neighborValue = boardState[neighborRow][neighborCol];
            if (neighborValue !== "00" && currentTile[0] !== neighborValue[0] && currentTile[1] !== neighborValue[1]) {
                boolIsLegal = false;
            }
        });

        return boolIsLegal;
    }

    const placeTile = (e) => {
        console.log('currentTile', currentTile);
        const targetId = e.target.id;
        if (targetId && targetId[0] === 'b') {
            const targetCoord = targetId.slice(1, 3);
            const [targetRow, targetCol] = [+targetCoord[0], +targetCoord[1]]; //targetRow and targetCol are strings
            if (checkLegalSpace(targetRow, targetCol)) {

                //create a new board state
                const newBoardState = createDeepCopyOfBoardState();
                newBoardState[targetRow][targetCol] = currentTile;
                setBoardState(newBoardState);

                //create a new tiles remaining
                const newTilesRemaining = [...tilesRemaining];
                newTilesRemaining.splice(tilesRemaining.indexOf(currentTile), 1);
                newTilesRemaining.push(getRandomTileValue());
                setTilesRemaining(newTilesRemaining);

                //reset the current tile to nothing
                setCurrentTile("00");

                //increase the turn count
                const newTurn = turn + 1;
                setTurn(newTurn);

                //increase the score
                const newScore = score + 4;
                setScore(newScore);

                //create the new string for the board and tiles
                const newTileString = newTilesRemaining.join(",");
                const newBoardStateString = currentPlaySession.moves + boardStateToString(newBoardState, newTurn);

                //update the play_session
                const updatedSession = { ...currentPlaySession };
                updatedSession.score = newScore;
                updatedSession.moves = newBoardStateString;
                updatedSession.tiles = newTileString;
                dispatch(playSessionActions.fetchUpdateCurrentPlaySession(updatedSession))
            }
        }
    }


    const selectTile = (e) => {
        const targetId = e.target.id;
        if (targetId) {
            const indexOfDash = targetId.indexOf("-")
            if (indexOfDash !== -1) {
                const strTile = targetId.slice(indexOfDash+1, targetId.length);
                setCurrentTile(strTile);
            }
        }
    }

    const postNewPlaySession = (boardId, userId) => {
        dispatch(playSessionActions.fetchPostNewPlaySession(boardId, userId));
        history.push('/');
    }


    // JSX

    if (!isLoaded) {
        return null;
    }

    return (
        <div className='game-display-container'>

            <div className='game-display-board game-display-border'>
                <h3>
                    <span>Board #{currentPlaySession.board_id}</span>
                    <span>
                        <button
                        onClick={()=>postNewPlaySession(currentPlaySession.board_id, currentPlaySession.user_id)}
                        className='button-new-session-for-board button-chocolate'
                        >
                            Start a New Session with this Board
                        </button>
                    </span>
                </h3>
                <div
                onClick={placeTile}
                >
                    <BoardDisplay boardState={boardState}/>
                </div>
            </div>

            <div className='game-display-tiles game-display-border'>
                <div
                onClick={selectTile}
                >
                    <TilesDisplay arrTiles={tilesRemaining}/>
                </div>
            </div>

            <div className='game-display-info game-display-border'>
                <h2>Game: Session #{currentPlaySession.id}</h2>
                <h3>Turn: {turn} - Score: {score}</h3>

                <div className='game-display-rules'>
                    <div>Rules:</div>
                    <ul>
                        <li>
                            Click on one of the tiles in the Tiles section, to select
                            that tile to place.  To choose a different tile without placing,
                            click a new tile from the Tiles section.
                        </li>
                        <li>
                            After selecting a tile, click on the Board to place that tile.
                        </li>
                        <li>
                            Rules for placing a new tile:
                            <ol>
                                <li>
                                    The new tile must be adjacent to an existing tile.
                                    (Adjacent is up, down, left, and right; diagonals are
                                    not adjacent.)
                                </li>
                                <li>
                                    For each adjacent tile, the new tile must match either
                                    the color (white, milk, dark) or number (1, 2, 3, 4).
                                </li>
                                <li>
                                    Place as many tiles as you can!
                                </li>
                                <li>
                                    To start a new game on the same board, click the "Start a
                                    New Session with this Board" button.
                                </li>
                                <li>
                                    To start a new game on a different board, click the "Boards"
                                    link on the navigation bar.
                                </li>
                            </ol>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default GameDisplay;