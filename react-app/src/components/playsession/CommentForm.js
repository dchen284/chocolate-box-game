// External imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Internal imports
import * as commentActions from '../../store/comment';

const CommentForm = () => {

    // hooks and state variables
    const dispatch = useDispatch();
    const { playSessionId } = useParams();
    const [comment, setComment] = useState('');
    const user = useSelector(state => state.session.user)

    // functions
    const commentSubmit = (e) => {
        e.preventDefault();
        const commentToAdd = {
            user_id: user.id,
            play_session_id: playSessionId,
            body: comment,
        }
        dispatch(commentActions.fetchAddComment(commentToAdd));
    }

    // useEffects


    // JSX
    return (
        <form action="post" method={`/${playSessionId}/comments`}>
            <label htmlFor="comment_text">Comment Here:</label>
            <textarea
                id="comment_text"
                placeholder="Type your comment here."
                onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <button
                onClick={commentSubmit}
            >
                Submit
            </button>
        </form>
    )
}

export default CommentForm;