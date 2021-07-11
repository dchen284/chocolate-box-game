// import tokenDark1 from '../../images/tokens/token_dark-1.png';
// import React, { useState } from 'react';
// import GameTile from './GameTile';

import tileD1 from '../../images/tiles/tile-dark-1.png';
import tileD2 from '../../images/tiles/tile-dark-2.png';
import tileD3 from '../../images/tiles/tile-dark-3.png';
import tileD4 from '../../images/tiles/tile-dark-4.png';

import tileM1 from '../../images/tiles/tile-milk-1.png';
import tileM2 from '../../images/tiles/tile-milk-2.png';
import tileM3 from '../../images/tiles/tile-milk-3.png';
import tileM4 from '../../images/tiles/tile-milk-4.png';

import tileW1 from '../../images/tiles/tile-white-1.png';
import tileW2 from '../../images/tiles/tile-white-2.png';
import tileW3 from '../../images/tiles/tile-white-3.png';
import tileW4 from '../../images/tiles/tile-white-4.png';

import './GameDisplay.css';

const GameSpace = ({spaceId, tileInput, legalMove}) => {

    // state variables

    // const [isOccupied, setIsOccupied] = useState(false);

    // functions
    // const tileInput = 'W3';

    let srcInput;
    switch (tileInput) {
        case 'D1':
            srcInput = tileD1;
            break;
        case 'D2':
            srcInput = tileD2;
            break;
        case 'D3':
            srcInput = tileD3;
            break;
        case 'D4':
            srcInput = tileD4;
            break;
        case 'M1':
            srcInput = tileM1;
            break;
        case 'M2':
            srcInput = tileM2;
            break;
        case 'M3':
            srcInput = tileM3;
            break;
        case 'M4':
            srcInput = tileM4;
            break;
        case 'W1':
            srcInput = tileW1;
            break;
        case 'W2':
            srcInput = tileW2;
            break;
        case 'W3':
            srcInput = tileW3;
            break;
        case 'W4':
            srcInput = tileW4;
            break;
        default:
            srcInput = null;
    }

    let srcLegalMove = null;
    switch (legalMove) {
        case 'D1':
            srcLegalMove = tileD1;
            break;
        case 'D2':
            srcLegalMove = tileD2;
            break;
        case 'D3':
            srcLegalMove = tileD3;
            break;
        case 'D4':
            srcLegalMove = tileD4;
            break;
        case 'M1':
            srcLegalMove = tileM1;
            break;
        case 'M2':
            srcLegalMove = tileM2;
            break;
        case 'M3':
            srcLegalMove = tileM3;
            break;
        case 'M4':
            srcLegalMove = tileM4;
            break;
        case 'W1':
            srcLegalMove = tileW1;
            break;
        case 'W2':
            srcLegalMove = tileW2;
            break;
        case 'W3':
            srcLegalMove = tileW3;
            break;
        case 'W4':
            srcLegalMove = tileW4;
            break;
        default:
            srcLegalMove = null;
    }

    // JSX

    return (
        <div className="game_space__edge">
            <div
            className="game_space__interior"
            id={spaceId}
            // onClick={(e) => console.log(e.target.id.slice(1))}
            >
                <div>
                    {srcInput ?
                    <img
                    className="token"
                    src={srcInput}
                    alt={`${srcInput}`}
                    id={`${spaceId}-${tileInput}`}
                    />
                    : null}
                    {srcLegalMove ?
                    <img
                    className="token token-legal-move"
                    src={srcLegalMove}
                    alt={`${srcLegalMove}`}
                    id={`${spaceId}-${srcLegalMove}`}
                    />
                    : null}
                </div>
            </div>
        </div>
    )
}

export default GameSpace;