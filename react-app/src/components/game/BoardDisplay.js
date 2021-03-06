import GameSpace from './GameSpace';
import './GameDisplay.css';

const BoardDisplay = ({boardState, legalMoves}) => {

    const numberOfRows = 5;
    const numberOfColumns = 5;
    const gameBoard = new Array(numberOfRows)

    if (boardState.length && legalMoves.length) {
        for (let i = 0; i < numberOfRows; i++) {
            gameBoard[i] = new Array(numberOfColumns);
            for (let j = 0; j < numberOfColumns; j++) {
                gameBoard[i][j] =
                    <GameSpace
                        key={`${i}${j}`}
                        spaceId={`b${i}${j}`}
                        tileInput={boardState[i][j]}
                        legalMove={legalMoves[i][j]}
                    />;
            }
        }
    }


    if(!boardState.length) {
        return null;
    }

    return (
        <>
            <div className="board_container board_container--border">
                <div className="board_container__grid">
                    {gameBoard}
                </div>
            </div>
        </>

    )
}

export default BoardDisplay;