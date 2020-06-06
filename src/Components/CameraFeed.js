import React from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { loadModels } from './LoadModels';
import * as faceapi from 'face-api.js';


const Styles = (theme => ({
    root: {
      flexGrow: 1,
      margin: '0 auto',
      width: '340px',
      height: 'auto',
    //   backgroundColor: 'rgba(0,0,0,0.85)',
      marginTop: '1rem',
      marginBottom: '1rem'
    }
  }));


class CameraFeed extends React.Component {
    constructor(){
        super()
        this.state = {
        }

        this.canvasFeedRef = React.createRef()
    }
    
    componentDidMount = async () => {
        await loadModels();
        this.videoFeed();
        this.startCanvasFeed();
    }

    startCanvasFeed = () => {
        this.interval = setInterval( () => {
            this.canvasFeed()
        }, 100 )
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    videoFeed = () => {
        const constraints = { audio: false, video: {width: '340', height: '180'} }
        navigator.mediaDevices.getUserMedia(constraints)
        .then( stream => {
            this.setState({stream})
            this.videoPlayer.srcObject = stream;
            this.videoPlayer.play()
        })
        .catch(err => console.log(err))
    }

    canvasFeed = async () => {
        const context = this.canvasFeedRef.current.getContext('2d')
        context.drawImage(this.videoPlayer, 0,0, this.videoPlayer.width, this.videoPlayer.height);
        
        const video = document.getElementById('videoFeed');
        const canvas = document.getElementById('canvasFeed');

        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withAgeAndGender()
            .withFaceExpressions()

            const dimensions = {
                width: this.videoPlayer.width,
                height: this.videoPlayer.height
            };

            const resizedDimensions = faceapi.resizeResults(detections, dimensions)

            // faceapi.draw.drawDetections(canvas, resizedDimensions)
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions)
            faceapi.draw.drawFaceExpressions(canvas, resizedDimensions)

            const emotion = Object.keys(detections[0].expressions).find( key => detections[0].expressions[key] > 0.5 )

            this.props.getCurrentEmotion(emotion)
           

        console.log('detections', detections)
    }

    
    
    render(){
        const { classes, } = this.props;


        return(
            <Paper elevation={3} variant='outlined' className={classes.root}>
                    <div style={{maxWidth:'100%'}}>
                        <video id='videoFeed' ref={ref => (this.videoPlayer = ref)} width='340' height='180'  />
                        <canvas id='canvasFeed' ref={this.canvasFeedRef} width='340' height='180'  />
                    </div>
                </Paper>
                
        )
    }
}

export default withStyles(Styles)(CameraFeed);