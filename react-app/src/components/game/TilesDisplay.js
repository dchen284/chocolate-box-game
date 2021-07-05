import GameSpace from './GameSpace';
import './GameDisplay.css';

const TilesDisplay = ({arrTiles}) => {

    // const strTiles = 'D1,M3,W2,D4,M4,W4';
    // let arrTiles = [];
    // let selectedTile = "";

    // const stringToTilesState = (strTiles) => {
    //     arrTiles = strTiles.split(",");
    // }

    // stringToTilesState(strTiles);

    // const selectTile = (tile) => {
    //     selectedTile = tile;
    // }

    // setup for display
    const numberOfShownTiles = 3;
    const gameTilesDisplay = new Array(numberOfShownTiles);
    for (let i = 0; i < numberOfShownTiles; i++) {
        gameTilesDisplay[i] =
            <GameSpace
                key={`piece-${i}`}
                spaceId={`t${i}`}
                tileInput={arrTiles[i]}
            />
    }

    return (
        <>
            <h3>
                Tiles
            </h3>
            <div className="tiles_container tiles_container--border">
                <div
                className="tiles_container__grid"
                // onClick={(e) => console.log(e.target.id)}
                >
                    {gameTilesDisplay}
                </div>
            </div>
        </>
    )
}

export default TilesDisplay;