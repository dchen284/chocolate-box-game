// External imports
import React, { useEffect, useState } from 'react';
// Internal imports
import BoardDisplay from './BoardDisplay';
// import GameSpace from './GameSpace';
import TilesDisplay from './TilesDisplay';
import './GameDisplay.css';


const GameDisplay = () => {

    const numberOfRows = 5;
    const numberOfColumns = 5;
    const initialBoardState = new Array(numberOfRows)

    for (let i = 0; i < numberOfRows; i++) {
        initialBoardState[i] = new Array(numberOfColumns);
        for (let j = 0; j < numberOfColumns; j++) {
            initialBoardState[i][j] = "00"
        }
    }

    initialBoardState[1][2] = "M3";
    initialBoardState[4][3] = "D2";

    const [boardState, setBoardState] = useState(initialBoardState);
    const [currentTile, setCurrentTile] = useState("00");
    const [tilesRemaining, setTilesRemaining] = useState(["D1", "D1", "D1"]);


    // const boardStateToString = (boardState) => {
    //     let strOutput = "";
    //     for (let i = 0; i < numberOfRows; i++) {
    //         for (let j = 0; j < numberOfColumns; j++) {
    //             strOutput += `${boardState[i][j]},`;
    //         }
    //     }
    //     strOutput = strOutput.slice(0, strOutput.length - 1);
    //     console.log('strOutput', strOutput);
    //     return strOutput;
    // }


    // boardStateToString(initialBoardState);

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

    // useEffect(()=>{
    //     const createDeepCopyOfBoardState = () => {
    //         const copy = new Array(numberOfRows)

    //         for (let i = 0; i < numberOfRows; i++) {
    //             copy[i] = new Array(numberOfColumns);
    //             for (let j = 0; j < numberOfColumns; j++) {
    //                 copy[i][j] = "00"
    //             }
    //         }

    //         for (let i = 0; i < numberOfRows; i++) {
    //             for (let j = 0; j < numberOfColumns; j++) {
    //                 copy[i][j] = boardState[i][j];
    //             }
    //         }
    //         return copy;
    //     }

    //     const copy = createDeepCopyOfBoardState();
    //     copy[1][2] = "M3";
    //     copy[4][3] = "D2";
    //     setBoardState(copy);
    // },[])

    useEffect(()=>{
        const strTiles = 'D1,M3,W2,D4,M4,W4';
        setTilesRemaining(strTiles.split(","));
        // console.log('useEffect fired');
    }, [])


    const getNeighbors = (row, col) => {
        // console.log(coord);
        const neighbors = [];
        // const [row, col] = [+coord[0], +coord[1]]; //row and col are numbers
        if (0 <= row - 1) {neighbors.push([row-1, col])}
        if (0 <= col - 1) {neighbors.push([row, col-1])}
        if (row+1 < numberOfRows) {neighbors.push([row+1, col])}
        if (col+1 < numberOfColumns) {neighbors.push([row, col+1])}

        return neighbors;
        // const currSpace = boardState[row][col];
        // const legalNeighbors = neighborSpaces.filter(neighbor => {
        //     if (neighbor !== "00") {
        //         if (currSpace[0] === neighbor[0] || currSpace[1] === neighbor[1]) {
        //             return true;
        //         }
        //     }
        //     return false;
        // })


    }

    const checkLegalSpace = (row, col) => {
        let boolIsLegal = true;
        const neighbors = getNeighbors(row, col);
        // const [row, col] = [+coord[0], +coord[1]]; //row and col are numbers

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

        //for each space's occupied neighbors, if either the letter or number do not match, the
        //move is not legal

        neighbors.forEach( neighbor => {
            const [neighborRow, neighborCol] = neighbor;
            const neighborValue = boardState[neighborRow][neighborCol];
            if (neighborValue !== "00" && currentTile[0] !== neighborValue[0] && currentTile[1] !== neighborValue[1]) {
                // console.log('did not match')
                boolIsLegal = false;
            }
        });

        // console.log(boolIsLegal);
        return boolIsLegal;
    }

    const placeTile = (e) => {
        // console.log('placeTile fired'
        console.log('currentTile', currentTile);
        const targetId = e.target.id;
        if (targetId && targetId[0] === 'b') {
            const targetCoord = targetId.slice(1, 3);
            const [targetRow, targetCol] = [+targetCoord[0], +targetCoord[1]]; //targetRow and targetCol are strings
            if (checkLegalSpace(targetRow, targetCol)) {
                // console.log('placing tile');

                //create a new board state
                const newBoardState = createDeepCopyOfBoardState();
                newBoardState[targetRow][targetCol] = currentTile;
                setBoardState(newBoardState);

                //create a new tiles remaining
                const newTilesRemaining = [...tilesRemaining];
                newTilesRemaining.splice(tilesRemaining.indexOf(currentTile), 1);
                setTilesRemaining(newTilesRemaining);

                //reset the current tile to nothing
                setCurrentTile("00");
            }
        }
    }

    // console.log('tiles in base file', tilesRemaining);

    const selectTile = (e) => {
        // console.log('tiles in selectTile', tilesRemaining);
        const targetId = e.target.id;
        if (targetId) {
            const indexOfDash = targetId.indexOf("-")
            if (indexOfDash !== -1) {
                const strTile = targetId.slice(indexOfDash+1, targetId.length);
                setCurrentTile(strTile);
                console.log('updated new tile');
            }
        }
    }

    // JSX

    return (
        <>
            <h1>Game</h1>
            <div
            onClick={placeTile}
            >
                <BoardDisplay boardState={boardState}/>
            </div>

            <div
            onClick={selectTile}
            >
                <TilesDisplay arrTiles={tilesRemaining}/>
            </div>
        </>
    )
}

export default GameDisplay;