// //External Imports
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// //Internal Imports
// import * as boardActions from '../../store/board';
// import * as favoritePlayerActions from '../../store/favorite_player';
// // import * as playSessionActions from '../../store/playsession';
// import './TableDisplay.css';

// const TableDisplay = () => {

//     //hooks and state variables
//     const dispatch = useDispatch();
//     const boards = useSelector((state) => state.boards);
//     const boardsValues = Object.values(boards);
//     const favoritePlayers = useSelector((state) => state.favoritePlayers);
//     const favoritePlayersValues = Object.values(favoritePlayers);
//     // const playSessions = useSelector((state) => state.playSessions);
//     // const playSessionsValues = Object.values(playSessions);
//     const user = useSelector((state) => state.session.user);

//     useEffect(() => {
//         dispatch(boardActions.fetchAllBoards());
//         dispatch(favoritePlayerActions.fetchAllFavoritesOfUser(user.id));
//         // dispatch(playSessionActions.fetchAllPlaySessions());
//     }, [dispatch, user.id]);

//     // useEffect( () => {
//     //     async function blah() {
//     //         console.log('testing here')
//     //         const res = await fetch(`/api/users/1/favorite_players`)
//     //         const data = await res.json();
//     //         console.log('testing again', data)
//     //     }
//     //     blah();
//     // }, [])

//     const deleteFavorite = (userId, favoriteId) => {
//         dispatch(favoritePlayerActions.fetchDeleteFavorite(userId, favoriteId))
//     }

//     const addFavorite = (userId, favoriteId) => {
//         dispatch(favoritePlayerActions.fetchAddFavorite(userId, favoriteId))
//     }

//     const isIndexOdd = (index) => {
//         if (index % 2 === 1) {return 'pure-table-odd'}
//         else {return 'pure-table-even'}
//     }

//     return (
//         <div className="tabledisplay_container">
//             <div className="tabledisplay_text">
//                 <h1>TableDisplay</h1>
//                 <button
//                 onClick={() => addFavorite(user.id, 2)}
//                 >Add Marnie as Favorite</button>
//                 <table className="pure-table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Board Data</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {boardsValues?.map( (board, index) => {
//                         return (
//                             <tr key={board.id} className={isIndexOdd(index)}>
//                                 <td>{board.id}</td>
//                                 <td>{board.initialBoardSetup}</td>
//                             </tr>

//                         )
//                     })}
//                     </tbody>
//                 </table>
//                 <table className="pure-table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Unfavorite</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {favoritePlayersValues?.map( (favoritePlayer, index) => {
//                         return (
//                             <tr key={favoritePlayer.id} className={isIndexOdd(index)}>
//                                 <td>{favoritePlayer.id}</td>
//                                 <td>{favoritePlayer.username}</td>
//                                 <td>
//                                     <button>
//                                         <i
//                                         className="fas fa-heart"
//                                         onClick={()=> deleteFavorite(user.id, favoritePlayer.id)}></i>
//                                     </button>
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                     </tbody>
//                 </table>
//                 {/* {playSessionsValues ? <div>{playSessionsValues}</div> : null} */}
//             </div>
//             <table className="right-pure-table pure-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Make</th>
//                         <th>Model</th>
//                         <th>Year</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className="pure-table-odd">
//                         <td>1</td>
//                         <td>Honda</td>
//                         <td>Accord</td>
//                         <td>2009</td>
//                     </tr>
//                     <tr>
//                         <td>2</td>
//                         <td>Toyota</td>
//                         <td>Camry</td>
//                         <td>2012</td>
//                     </tr>
//                     <tr className="pure-table-odd">
//                         <td>3</td>
//                         <td>Hyundai</td>
//                         <td>Elantra</td>
//                         <td>2010</td>
//                     </tr>
//                     <tr>
//                         <td>4</td>
//                         <td>Ford</td>
//                         <td>Focus</td>
//                         <td>2008</td>
//                     </tr>
//                     <tr className="pure-table-odd">
//                         <td>5</td>
//                         <td>Nissan</td>
//                         <td>Sentra</td>
//                         <td>2011</td>
//                     </tr>
//                     <tr>
//                         <td>6</td>
//                         <td>BMW</td>
//                         <td>M3</td>
//                         <td>2009</td>
//                     </tr>
//                     <tr className="pure-table-odd">
//                         <td>7</td>
//                         <td>Honda</td>
//                         <td>Civic</td>
//                         <td>2010</td>
//                     </tr>
//                     <tr>
//                         <td>8</td>
//                         <td>Kia</td>
//                         <td>Soul</td>
//                         <td>2010</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default TableDisplay;