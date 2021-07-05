// External imports
import React from 'react';
// Internal imports
import GameSpace from './GameSpace';
// import tokenDark1 from '../../images/tokens/token_dark-1.png';
// import tokenDark2 from '../../images/tokens/token_dark-2.png';
// import tokenDark3 from '../../images/tokens/token_dark-3.png';
// import tokenDark4 from '../../images/tokens/token_dark-4.png';
// import tokenMilk1 from '../../images/tokens/token_milk-1.png';
// import tokenMilk2 from '../../images/tokens/token_milk-2.png';
// import tokenMilk3 from '../../images/tokens/token_milk-3.png';
// import tokenMilk4 from '../../images/tokens/token_milk-4.png';
// import tokenWhite1 from '../../images/tokens/token_white-1.png';
// import tokenWhite2 from '../../images/tokens/token_white-2.png';
// import tokenWhite3 from '../../images/tokens/token_white-3.png';
// import tokenWhite4 from '../../images/tokens/token_white-4.png';
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