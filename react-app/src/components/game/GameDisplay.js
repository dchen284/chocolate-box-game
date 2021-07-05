// External imports
import React from 'react';
// Internal imports
import GameSpace from './GameSpace';
import './GameDisplay.css';


const GameDisplay = () => {


    const numberOfRows = 5;
    const numberOfColumns = 5;
    const gameBoard = new Array(numberOfRows)

    for (let i = 0; i < numberOfRows; i++) {
        gameBoard[i] = new Array(numberOfColumns);
        for (let j = 0; j < numberOfColumns; j++) {
            gameBoard[i][j] = <GameSpace key={`${i}${j}`}/>;
        }
    }

    const numberOfShownTiles = 3;
    const gameTilesDisplay = new Array(numberOfShownTiles);
    for (let i = 0; i < numberOfShownTiles; i++) {
        gameTilesDisplay[i] = <GameSpace key={`piece-${i}`} />
    }

    console.log(gameBoard);

    // functions

    // JSX

    return (
        <>
            <h1>Game</h1>
            <div className="board_container board_container--border">
                <div className="board_container__grid">
                    {gameBoard}
                </div>
            </div>
            <div>
                <div>Pieces</div>
            </div>
            <div className="tiles_container tiles_container--border">
                <div className="tiles_container__grid">
                    {gameTilesDisplay}
                </div>
            </div>
        </>
    )
}

export default GameDisplay;