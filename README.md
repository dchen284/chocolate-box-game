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
After logging in, the user's current play session is loaded.  The user can:
* Play the game as the current session.  Instructions are on the page.
* Start a new play session on the current board.
* Use the navigation bar to reach other features.

### Loading a Play Session
The user can load a previously-started play session.
* Clicking from "Your Play Sessions" link shows a list of all play sessions belonging to the user.
* Clicking the "Load Play Session" button brings the user to the main page, with that session loaded.

### Favorites
The user can mark players as Favorites, for ease of accessing play data of that player.
* A list of Favorites is displayed under the 'Favorite Players' link on the navigation bar.
* On most places of the site where the player name appears, a "Favorite" button is available.
* Clicking on the Favorites button of that player toggles that player's status as a Favorite.

### 
