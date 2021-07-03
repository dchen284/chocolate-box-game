// External imports
import React from 'react';
// Internal imports
import tokenDark1 from '../../images/tokens/token_dark-1.png';
import tokenDark2 from '../../images/tokens/token_dark-2.png';
import tokenDark3 from '../../images/tokens/token_dark-3.png';
import tokenDark4 from '../../images/tokens/token_dark-4.png';
import tokenMilk1 from '../../images/tokens/token_milk-1.png';
import tokenMilk2 from '../../images/tokens/token_milk-2.png';
import tokenMilk3 from '../../images/tokens/token_milk-3.png';
import tokenMilk4 from '../../images/tokens/token_milk-4.png';
import tokenWhite1 from '../../images/tokens/token_white-1.png';
import tokenWhite2 from '../../images/tokens/token_white-2.png';
import tokenWhite3 from '../../images/tokens/token_white-3.png';
import tokenWhite4 from '../../images/tokens/token_white-4.png';
import './GameContainer.css';

const GameContainer = () => {
    return (
        <>
            <h1>Game</h1>
            <div className="box-grid">
                <div className="light-box">
                    <div className="dark-box">
                        <img className="token" src={tokenWhite1} alt="tokenDark1" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default GameContainer;