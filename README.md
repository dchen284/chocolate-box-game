## Welcome To Chocolate-Box-Game
**Chocolate-Box-Game** is a single-player game played in the browser.  Users can also access their past play sessions, start multiple play sessions, or look at how other players do on the leaderboard. 

## Live Site
https://chocolate-box-game.herokuapp.com/
![Home Page](https://i.imgur.com/Av0Sh0U.png)

## Technologies Used
* Front-end: React, Redux, JavaScript
* Back-end: Flask, Python, PostgreSQL
* Back-end libraries: flask-cors, flask-sqlalchemy, flask-wtf, wtforms, flask-migrate, flask-login, 
* Other: Heroku, Docker

## Site Features

### Login Page
A user must log in or sign up to use the app.  The navigation bar redirects to the login page if the user is not logged in.

### Main Page
After logging in, the user's current Play Session is loaded.  The user can:
* Play the game as the current session.  Instructions are on the page.
* Start a new Play Session with the same board.
* Use the navigation bar to reach other features.

### Loading a Play Session
The user can load a previously-started Play Session.
* Clicking from "Your Play Sessions" link shows a list of all Play Sessions belonging to the user.
* Clicking the "Load Play Session" button brings the user to the main page, with that Play Session loaded.

### Reviewing a Play Session's History
![History](https://i.imgur.com/pxzdJLv.gif)

The user can review the history of a Play Session, including Play Sessions of other players.
* Clicking a "Move History/Comments" button loads up the history of that Play Session.
* The user can click on a Turn button in the 'Turns' section to load up the board state of that turn.

### Favorites
![Favorites](https://i.imgur.com/7r5GaoA.gif)

The user can mark players as Favorites, for ease of accessing play data of that player.
* A list of Favorites is displayed under the "Favorite Players" link on the navigation bar.
* In most places where the player name appears, a "Favorite" button is available.
* Clicking on the Favorites button of that player toggles that player's status as a Favorite.

### Comments
![Comments](https://i.imgur.com/hfhEFJz.png)

The user can leave comments on a Play Session.
* After a "Move History/Comments" button, comments of that Play Session are loaded.
* The user can create a new comment with the provided form.
* The user can edit or delete comments that were created by that user.

## Database Schema
![Database Schema](https://i.imgur.com/KDj0P68.png)

## Code Snippets for Features

### Saving Data
To reduce the number of database entries, moves for a Play Session are saved as a string, then placed as a column in the Play Session table.
Functions in the front-end convert the moves between string for storage, and 2D array for rendering in React.  Some examples of these functions are provided below.
```js
    function createTurnsArray(strMoves) {
        if (strMoves) {
            const arrNew = strMoves.split("T");
            arrNew.shift();
            const arrNew2 = arrNew.map( el => "T" + el);
            return arrNew2;
        }
    }


    function updateDisplayedTurn(turn) {
        const turnNumber = turn.slice(1, 3);
        setDisplayedTurn(turnNumber);
        setBoardState(stringToBoardState(turn, numberOfRows, numberOfColumns));
    }

    function stringToBoardState(strBoardState, numberOfRows, numberOfColumns) {
        if (strBoardState) {
            const lengthOfOneTurn = numberOfRows * numberOfColumns * 3 + 4 - 1;
            //string format:
            //T00:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,00
            //T01:00,00,00,00,00,00,00,M3,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,D2,D1
            //number of entries is numberOfRows * numberOfColumns
            //each entry needs 3 characters (except the last one doesn't need a ,)
            //the string starts with 4 characters: `T##:`, then -1 to remove the last comma

            const intStartIndex = strBoardState.length - lengthOfOneTurn;
            const strLastBoardState = strBoardState.slice(intStartIndex);
            const arrBoardValues = strLastBoardState.slice(4).split(',');
            let k = 0;

            const loadedBoardState = new Array(numberOfRows)

            for (let i = 0; i < numberOfRows; i++) {
                loadedBoardState[i] = new Array(numberOfColumns);
                for (let j = 0; j < numberOfColumns; j++) {
                    loadedBoardState[i][j] = arrBoardValues[k];
                    k++;
                }
            }

            return loadedBoardState;
        }
    }
```



### Favorites
Because the Favorites button appears in multiple places, all code is placed in a FavoriteButton component.  The Favorites button also contains logic to not render for the user's name, when that user is logged in.  The component subscribes to the Redux store, so any changes can be read elsewhere on the app.
```js
const FavoriteButton = ({loggedInUserId, favoriteId}) => {

    // hooks and state variables
    const dispatch = useDispatch();
    const [isSelf, setIsSelf] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const favoritePlayers = useSelector(state => state.favoritePlayers);

    // useEffects
    useEffect(() => {
        if (favoritePlayers[favoriteId]) {setIsFavorite(true)}
        else {setIsFavorite(false)}
        if (+loggedInUserId === +favoriteId) {setIsSelf(true)}
        else {setIsSelf(false)}
    }, [favoriteId, favoritePlayers, loggedInUserId]);

    // functions
    const deleteFavorite = (userId, favoriteId) => {
        dispatch(favoritePlayerActions.fetchDeleteFavorite(userId, favoriteId));
    }

    const addFavorite = (userId, favoriteId) => {
        dispatch(favoritePlayerActions.fetchAddFavorite(userId, favoriteId));
    }

    // JSX

    if (isSelf) {
        return null;
    }


    return (
        <span>
            <button
            className="button-favorite"
            onClick={()=> {
                if (isFavorite) {
                    deleteFavorite(loggedInUserId, favoriteId);
                    setIsFavorite(false);
                }
                else {
                    addFavorite(loggedInUserId, favoriteId)
                    setIsFavorite(true);
                }
            }}
            >
                <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
            </button>
        </span>
    )
```

## Future Features
* Add extra bonus scoring goals (for example, +5 points for each milk tile 3 spaces away from a white tile)
* Be able to drag tiles to the board
