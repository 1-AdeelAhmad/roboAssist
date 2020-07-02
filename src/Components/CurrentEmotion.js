import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const CurrentEmotion = ({emotion, isFace}) => {
    return(
        <div style={{margin: '0 auto', marginTop: '1rem', width:'80%'}}>
            <Paper elevation={3} style={{padding: '1rem'}}>
                <Typography style={{marginBottom: '.5rem'}} align='center' variant='body2'>CURRENT EXPRESSION:</Typography>
                <Typography align='center' variant='subtitle2'>
                    {isFace? emotion.toUpperCase() : 'LOADING...'}
                </Typography>
            </Paper>
        </div>
    )
}

export default CurrentEmotion;