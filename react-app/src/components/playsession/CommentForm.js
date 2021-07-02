// External imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Internal imports
import * as commentActions from '../../store/comment';
import * as errorsActions from '../../store/error';

const CommentForm = ({ comment, setIsEditing }) => {

    // hooks and state variables
    const dispatch = useDispatch();
    const { playSessionId } = useParams();
    const [bodyText, setBodyText] = useState(comment?.body);
    const [errors, setErrors] = useState([])
    const [inputHolder, setInputHolder] = useState({body: ''})
    const errorsFromStore = useSelector(state => state.errors);
    const user = useSelector(state => state.session.user);


    // functions
    const commentSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            user_id: user.id,
            play_session_id: playSessionId,
            body: bodyText,
        }

        if (comment) { // this is editing an existing comment
            const commentToEdit = { ...commentToAdd, id: comment.id }
            dispatch(commentActions.fetchUpdateComment(commentToEdit));
            setInputHolder(commentToEdit);
            setIsEditing(false);
        }
        else { // this is not editing an existing comment, it is adding a new comment
            dispatch(commentActions.fetchAddComment(commentToAdd));
            setInputHolder(commentToAdd);
            setBodyText('');
        }

        // if (comment) { // this is editing an existing comment
        //     const commentToEdit = { ...commentToAdd, id: comment.id }
        //     const errorsFromBackend = await dispatch(commentActions.fetchUpdateComment(commentToEdit));
        //     if (errorsFromBackend.length) {
        //         setErrors(errorsFromBackend)
        //     }
        //     else {setIsEditing(false)}
        // }
        // else { // this is not editing an existing comment, it is adding a new comment
        //     const errorsFromBackend = await dispatch(commentActions.fetchAddComment(commentToAdd));
        //     if (errorsFromBackend.length) {
        //         setErrors(errorsFromBackend)
        //     }
        //     else {setBodyText('')}
        // }

    }

    // useEffects

    useEffect(() => {
        if (errorsFromStore.length) {
            // if (comment) {
            //     setIsEditing(true);
            // }
            setBodyText(inputHolder.body);
            setErrors(errorsFromStore);
            dispatch(errorsActions.clearErrors());
        }
    }, [comment, dispatch, errorsFromStore, inputHolder, setIsEditing]);


    // JSX
    return (
        <>
            <ul>
            {errors.map(error => {
                return (
                    <li key={error}>{error}</li>
                )
            })}
            </ul>
            {/* {errors.length ?
                <ul>
                {errors.map(error => {
                    return (
                        <li key={error}>{error}</li>
                    )
                })}
                </ul>
                : null
            } */}
            <form>
                <label htmlFor="comment_text">Comment Here:</label>
                <textarea
                    id="comment_text"
                    placeholder="Type your comment here."
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                >
                </textarea>
                <button onClick={commentSubmit}>
                    Submit
                </button>
                { comment ?
                <button onClick={() => setIsEditing(false)}>
                    Cancel
                </button>
                : null }
            </form>
        </>
    )
}

export default CommentForm;