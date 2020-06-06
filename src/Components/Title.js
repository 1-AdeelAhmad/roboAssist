import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:' 1.25rem',
    },
    subtitle: {
        marginTop: '1rem',
        marginBottom: '1rem',
        fontStyle: 'italic',
        fontSize:'.6rem'
    }
  }));

const Title = () => {

    const classes = useStyles();

    return(
        <div>
            <AppBar position="static" color='primary' style={{borderTopRightRadius: '20px',borderTopLeftRadius: '20px' }}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Emoti Video
                    </Typography>
                    {/* <Button color="inherit">Name</Button> */}
                </Toolbar>
            </AppBar>
            <Typography className={classes.subtitle} align='center' display='block' variant='button' >An App That Detects Facial Emotions In Real-Time</Typography>
        </div>
    )
}

export default Title;