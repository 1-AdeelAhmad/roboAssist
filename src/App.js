import React from 'react';
import './App.css';
import { Container, Paper } from '@material-ui/core';
import CameraFeed from './Components/CameraFeed';
import Title from './Components/Title';
import CurrentEmotion from './Components/CurrentEmotion';

class App extends React.Component{
    constructor(){
        super()
        this.state =  {
            emotion: ''
        }
    }

    getCurrentEmotion = (emotion) => {
        this.setState({emotion})
    }

    render(){
        return(
            
            <Container maxWidth='sm' style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <Paper elevation={3} style={{borderRadius: '20px'}}>
                    <Title/>
                    <hr style={{width: '60%'}}/>
                    <CameraFeed getCurrentEmotion={this.getCurrentEmotion} />
                    
                    <hr style={{width: '60%'}}/>
                    <CurrentEmotion emotion={this.state.emotion}/>
                </Paper>
            </Container>

        )
    }
}

export default App;