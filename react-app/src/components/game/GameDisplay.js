// External imports
import React, { useEffect, useState } from 'react';
// Internal imports
import BoardDisplay from './BoardDisplay';
// import GameSpace from './GameSpace';
import TilesDisplay from './TilesDisplay';
import './GameDisplay.css';


const GameDisplay = () => {

    // const strTiles = 'D1,M3,W2,D4,M4,W4';



    const stringToTilesState = (strTiles) => {
        return strTiles.split(",");
    }

    // let arrTiles = stringToTilesState(strTiles);

    const [tiles, setTiles] = useState(["D1", "D1", "D1"]);

    useEffect(()=>{
        const strTiles = 'D1,M3,W2,D4,M4,W4';
        let arrTiles = stringToTilesState(strTiles);
        setTiles(arrTiles);
    }, [])

    // JSX

    return (
        <>
            <h1>Game</h1>
            <div
            onClick={() => {
                // arrTiles.shift();
                setTiles(tiles.slice(1));
                console.log(tiles);}}
            >
                <BoardDisplay />
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