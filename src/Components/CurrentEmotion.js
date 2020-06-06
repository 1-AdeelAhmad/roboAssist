import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const CurrentEmotion = ({emotion}) => {
    return(
        <div style={{width: '75%', margin: '0 auto', paddingTop: '1rem', paddingBottom: '2rem'}}>
            <Paper elevation={3} style={{padding: '1rem'}}>
                <Typography align='center' variant='subtitle1'>Current Emotion:</Typography>
                <Typography align='center' variant='h6'>{emotion}</Typography>
            </Paper>
        </div>
    )
}

export default CurrentEmotion;