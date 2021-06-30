import React from 'react';
import { useParams } from 'react-router-dom';

const PlaySessionDetails = () => {

    // hooks and state variables
    const { playSessionId } = useParams();

    // JSX
    return (
        <div>{playSessionId}</div>
    );
}

export default PlaySessionDetails;