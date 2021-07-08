// External imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Internal imports
import * as commentActions from '../../store/comment';
import * as playSessionActions from '../../store/playsession';
import * as errorsActions from '../../store/error';
import BoardDisplay from '../game/BoardDisplay';
import CommentDisplay from './CommentDisplay';
import CommentForm from './CommentForm';
import './PlaySessionDetails.css';


const PlaySessionDetails = () => {

    const numberOfRows = 5;
    const numberOfColumns = 5;

    // hooks and state variables
    const dispatch = useDispatch();
    const { playSessionId } = useParams();

    const detailsSession = useSelector(state => state.playSessions.detailsSession);
    const comments = useSelector(state => state.comments);
    const commentValues = Object.values(comments).reverse();
    const [boardState, setBoardState] = useState([]);
    const [turnsArray, setTurnsArray] = useState([]);
    const [displayedTurn, setDisplayedTurn] = useState("00");
    const [errors, setErrors] = useState([])
    const errorsFromStore = useSelector(state => state.errors);

    // useEffects
    useEffect(() => {
        dispatch(playSessionActions.fetchSessionForDetails(playSessionId));
        dispatch(commentActions.fetchCommentsOfPlaySession(playSessionId));
    }, [dispatch, playSessionId]);

    useEffect(()=>{
        const newTurnsArray = createTurnsArray(detailsSession?.moves);
        setTurnsArray(newTurnsArray);
    }, [detailsSession])

    useEffect(()=>{
        if (turnsArray && turnsArray[0]) {
            setBoardState(stringToBoardState(turnsArray[0], numberOfRows, numberOfColumns));
        }
    },[turnsArray])

    // functions
    function createTurnsArray(strMoves) {
        if (strMoves) {
            // console.log('@!@!@!@!@!@!@!', strMoves)
            // const lengthOfOneTurn = numberOfRows * numberOfColumns * 3 + 4 - 1;
            const arrNew = strMoves.split("T");
            arrNew.shift();
            const arrNew2 = arrNew.map( el => "T" + el);
            return arrNew2;
        }
    }


    function updateDisplayedTurn(turn) {
        console.log('++++', turn, displayedTurn);
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
            // console.log('intStartIndex', intStartIndex);
            const strLastBoardState = strBoardState.slice(intStartIndex);
            const arrBoardValues = strLastBoardState.slice(4).split(',');
            // console.log('------------', arrBoardValues);
            let k = 0;

            const loadedBoardState = new Array(numberOfRows)

            for (let i = 0; i < numberOfRows; i++) {
                loadedBoardState[i] = new Array(numberOfColumns);
                for (let j = 0; j < numberOfColumns; j++) {
                    // console.log(loadedBoardState[i][j])
                    loadedBoardState[i][j] = arrBoardValues[k];
                    k++;
                }
            }

            return loadedBoardState;
        }
    }

    // if (detailsSession) {
    //     const newTurnsArray = createTurnsArray(detailsSession.moves);
    //     setTurnsArray(newTurnsArray);
    // }

    useEffect(() => {
        if (errorsFromStore.length) {
            // if (comment) {
            //     setIsEditing(true);
            // }
            // setBodyText(inputHolder.body);
            setErrors(errorsFromStore);
            dispatch(errorsActions.clearErrors());
        }
    }, [dispatch, errorsFromStore]);

    useEffect(()=>{
        if (comments) {
            setErrors([]);
            // dispatch(errorsActions.clearErrors());
        }
    }, [dispatch, comments])

    // JSX
    return (
        <div className="details-grid">

            <div className="details-board details-border">
                <h3>Showing Play Session #{playSessionId}, Turn #{displayedTurn}</h3>
                <BoardDisplay boardState={boardState}/>
            </div>

            <div className="details-moves details-border">
                <h3>
                    Moves
                </h3>
                <div className="details-moves-grid">
                    {turnsArray?.map( turn => {
                        return (
                            // <div className="details-moves-grid-item" key={turn}>
                                <button
                                key={turn}
                                onClick={()=>updateDisplayedTurn(turn)}
                                className=
                                {turn.slice(1, 3) === displayedTurn ?
                                    "button-chocolate button-highlighted" :
                                    "button-chocolate"
                                }
                                >
                                    {turn.slice(0, 3)}
                                </button>
                            // </div>
                        )
                    })}
                </div>
            </div>

            <div className="details-comments details-border">
                <h1>Comments</h1>
                <div>
                    {errors.map(error => {
                        return (
                            <div className="error-display" key={error}>{error}</div>
                        )
                    })}
                </div>
                <CommentForm />
                {commentValues?.map( comment => {
                    return (
                        <CommentDisplay comment={comment} key={comment.id}/>
                    )
                })}
            </div>
        </div>
    );
}

export default PlaySessionDetails;