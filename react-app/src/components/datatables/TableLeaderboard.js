// //External Imports
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// //Internal Imports
// import * as boardActions from '../../store/board';
// import * as favoritePlayerActions from '../../store/favorite_player';
// import * as playSessionActions from '../../store/playsession';

// const TableLeaderboard = () => {

//     //hooks and state variables
//     const dispatch = useDispatch();
//     const boards = useSelector((state) => state.boards);
//     const boardsValues = Object.values(boards);
//     const favoritePlayers = useSelector((state) => state.favoritePlayers);
//     const favoritePlayersValues = Object.values(favoritePlayers);
//     const playSessions = useSelector((state) => state.playSessions);
//     const playSessionsValues = Object.values(playSessions);
//     const user = useSelector((state) => state.session.user);

//     useEffect(() => {
//         dispatch(boardActions.fetchAllBoards());
//         dispatch(favoritePlayerActions.fetchAllFavoritesOfUser(user.id));
//         dispatch(playSessionActions.fetchAllPlaySessions());
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
//             </div>
//         </div>
//     )
// }

// export default TableLeaderboard;