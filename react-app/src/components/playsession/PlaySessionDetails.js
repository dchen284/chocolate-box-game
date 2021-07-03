// External imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Internal imports
import * as commentActions from '../../store/comment';
import CommentDisplay from './CommentDisplay';
import CommentForm from './CommentForm';
//import * as playsessionActions from '../../store/playsession';

const PlaySessionDetails = () => {

    // hooks and state variables
    const dispatch = useDispatch();
    const { playSessionId } = useParams();

    // const playSession = useSelector(state => state.playSessions[playsessionId]);
    const comments = useSelector(state => state.comments);
    const commentValues = Object.values(comments).reverse();

    // useEffects
    useEffect(() => {
        dispatch(commentActions.fetchCommentsOfPlaySession(playSessionId));
    }, [dispatch, playSessionId]);

    // JSX
    return (
        <div>
            <h1>Comments</h1>
            <CommentForm />
            {commentValues?.map( comment => {
                return (
                    <CommentDisplay comment={comment} key={comment.id}/>
                )
            })}
        </div>
    );
}

export default PlaySessionDetails;