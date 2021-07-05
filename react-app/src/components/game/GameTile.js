import tokenDark1 from '../../images/tokens/token_dark-1.png';
import './GameDisplay.css';

const GameTile = () => {
    return (
        <div>
            {<img className="token" src={tokenDark1} alt="tokenDark1" />}
        </div>
    )
}

export default GameTile;