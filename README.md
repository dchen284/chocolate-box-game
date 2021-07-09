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
