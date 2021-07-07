// External imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Internal imports
import * as commentActions from '../../store/comment';
import CommentForm from './CommentForm';

const CommentDisplay = ({comment}) => {

    //hooks and state variables
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const user = useSelector(state => state.session.user);

    //functions
    const editComment = (e) => {
        setIsEditing(true);
    }

    const deleteComment = (e) => {
        dispatch(commentActions.fetchDeleteComment(comment));
    }

    const showComment = () => {
        return (
            <>
                <div>Comment #{comment.id}</div>
                <div>{comment.body}</div>
                <div>
                    - 
                    <Link to={`/users/${comment.user_id}/playsessions`}>
                        {comment.username}
                    </Link>
                </div>
                { comment.user_id === user?.id ?
                <>
                    <button
                        className="pure-button"
                        onClick={editComment}>
                        Edit
                    </button>
                    <button
                        className="pure-button"
                        onClick={deleteComment}>
                        Delete
                    </button>
                </>
                : null
                }
                <hr></hr>
            </>
        )
    }

    const showForm = () => {
        return (
            <CommentForm comment={comment} setIsEditing={setIsEditing}/>
        )
    }

    //JSX
    return isEditing ? showForm() : showComment()
}

export default CommentDisplay;