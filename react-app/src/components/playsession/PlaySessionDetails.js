// External imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Internal imports
import * as commentActions from '../../store/comment';
//import * as playsessionActions from '../../store/playsession';

const PlaySessionDetails = () => {

    // hooks and state variables
    const dispatch = useDispatch();
    const { playSessionId } = useParams();

    // const playSession = useSelector(state => state.playSessions[playsessionId]);
    const comments = useSelector(state => state.comments);
    const commentValues = Object.values(comments);
    console.log('commentValues>>>>>>>>>>', commentValues);

    // useEffects
    useEffect(() => {
        dispatch(commentActions.fetchCommentsOfPlaySession(playSessionId));
    }, [dispatch, playSessionId]);

    // JSX
    return (
        <div>
            {commentValues?.map( comment => {
                return (
                    <div key={comment.id}>{comment.body}</div>
                )
            })}
        </div>
    );
}

export default PlaySessionDetails;