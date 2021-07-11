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

const SelectedTileDisplay = ({tileInput}) => {

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

    return (
        <>
            <h3>Current Selected Tile</h3>
            <div className='selected-tile'>
                {srcInput ?
                        <img
                        className="token"
                        src={srcInput}
                        alt={`${srcInput}`}
                        id={`selected-${tileInput}`}
                        />
                        : null}
            </div>
        </>
    )
}

export default SelectedTileDisplay;