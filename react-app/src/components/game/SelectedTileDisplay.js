import GameSpace from '../game/GameSpace';

import './GameDisplay.css';

const SelectedTileDisplay = ({tileInput}) => {

    return (
        <>
            <h3>Current Selected Tile</h3>
            <div className="selected-tile_container selected-tile_container--border">
                <div className="selected-tile_container_grid">
                    <div className='selected-tile'>
                    {tileInput ?
                        <GameSpace
                        spaceId={`selected`}
                        tileInput={tileInput}
                        />
                        : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectedTileDisplay;