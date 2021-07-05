// External imports
import React, { useEffect, useState } from 'react';
// Internal imports
import BoardDisplay from './BoardDisplay';
// import GameSpace from './GameSpace';
import TilesDisplay from './TilesDisplay';
import './GameDisplay.css';


const GameDisplay = () => {

    const [tiles, setTiles] = useState(["D1", "D1", "D1"]);


    const numberOfRows = 5;
    const numberOfColumns = 5;
    const initialBoardState = new Array(numberOfRows)

    for (let i = 0; i < numberOfRows; i++) {
        initialBoardState[i] = new Array(numberOfColumns);
        for (let j = 0; j < numberOfColumns; j++) {
            initialBoardState[i][j] = "00"
        }
    }

    const boardStateToString = (boardState) => {
        let strOutput = "";
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                strOutput += `${boardState[i][j]},`;
            }
        }
        strOutput = strOutput.slice(0, strOutput.length - 1);
        console.log('strOutput', strOutput);
        return strOutput;
    }

    initialBoardState[1][2] = "M3";
    boardStateToString(initialBoardState);

    const [boardState, setBoardState] = useState(initialBoardState);

    useEffect(()=>{
        const strTiles = 'D1,M3,W2,D4,M4,W4';
        setTiles(strTiles.split(","));
    }, [])

    const placeTile = () => {

    }

    // JSX

    return (
        <>
            <h1>Game</h1>
            <div
            onClick={() => {
                setTiles(tiles.slice(1));
                console.log(tiles);}}
            >
                <BoardDisplay boardState={boardState}/>
            </div>

            <div
            onClick={(e) => {if (e.target.id) console.log(e.target.id)}}
            >
                <TilesDisplay arrTiles={tiles}/>
            </div>
        </>
    )
}

export default GameDisplay;