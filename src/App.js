import React from 'react';
import './App.css';
import { Container, Paper, Grid, Button } from '@material-ui/core';
import VideoFeed from './Components/VideoFeed';
// import CameraFeed from './Components/CameraFeed';
import Title from './Components/Title';
import CurrentEmotion from './Components/CurrentEmotion';


class App extends React.Component{
    constructor(){
        super()
        this.state =  {
            emotion: '',
            age: '',
            gender: '',
            showLandmarks: false
        }
    }

    getCurrentEmotion = (emotion) => {
        this.setState({emotion})
    }


    showLandmarks = (e) => {
        e.preventDefault()
        this.setState({
            showLandmarks: !this.state.showLandmarks
        })
    }

    render(){
        return(
            
            <Container maxWidth='sm' style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <Paper elevation={3} style={{borderRadius: '20px'}}>
                    <Title/>
                    <hr style={{width: '60%'}}/>
                    {/* <CameraFeed getCurrentEmotion={this.getCurrentEmotion} /> */}
                    <VideoFeed 
                        getCurrentEmotion={this.getCurrentEmotion}
                        getCurrentAge={this.getCurrentAge}
                        getCurrentGender={this.getCurrentGender}
                        showLandmarks={this.state.showLandmarks}
                    />
                    <hr style={{width: '60%'}}/>
                    <Grid container spacing={3} justify='center'>
                        <Grid item xs={12}>
                            <CurrentEmotion emotion={this.state.emotion}/>
                        </Grid>
                        
                        <Grid item sm={12}>
                            <Paper style={{padding: '.25rem'}}>
                                <Button onClick={this.showLandmarks}>{this.state.showLandmarks? 'Click To Hide Landmarks' : 'Click To Show Landmarks'}</Button>
                            </Paper>    
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Container>

        )
    }
}

export default App;