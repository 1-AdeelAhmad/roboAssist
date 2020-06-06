import React from 'react';
import Webcam from 'react-webcam';
import { Paper, withStyles } from '@material-ui/core';
import * as faceapi from 'face-api.js';

const Styles = (theme => ({
    root: {
      flexGrow: 1,
      margin: '0 auto',
      width: '90vw',
      height: '90vw',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderRadius: '20px'

    }
  }));

const WIDTH = 300;
const HEIGHT = 300;

class VideoFeed extends React.Component{
    constructor(){
        super()
        this.state = {
            facingMode: null,
            detections: null,

        }
        this.webcam = React.createRef();
    }

    componentDidMount = async () => {
        await this.loadNewModel();
        this.setInputDevice();
    }

    loadNewModel = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
    }

    setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
            const inputDevice = await devices.filter(
                device => device.kind === 'videoinput'
            )
            if(inputDevice.length < 2){
               await this.setState({
                   facingMode: 'user'
               })
            } else {
                await this.setState({
                    facingMode: 'user'
                })
            }
            this.startVideoFeed();
        });
    }

    startVideoFeed = () => {
        this.interval = setInterval(() => {
            this.videoFeed()
        }, 100)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    videoFeed = async () => {
        const video = document.getElementById('video')

        const detections = await faceapi.detectAllFaces(video, 
                new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
        
                await this.setState({
                    detections
                })

            const dimensions = {
                width: WIDTH,
                height: HEIGHT
            };

            const resizedDimensions = faceapi.resizeResults(detections, dimensions)
            const canvas = document.getElementById('canvas');

            canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height)

            if(this.props.showLandmarks) {
                faceapi.draw.drawDetections(canvas, resizedDimensions)
                faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions)
            }
            // faceapi.draw.drawFaceExpressions(canvas, resizedDimensions)

            console.log(detections)

            if(this.state.detections.length > 0){
                const emotion = Object.keys(detections[0].expressions).find(key => detections[0].expressions[key] > 0.5 )
                this.props.getCurrentEmotion(emotion);

            }
    }

    render(){
        const { classes }  = this.props;
        const {facingMode } = this.state;
        let videoConstraints = null;
        // let camera = '';

        if(facingMode) {
            videoConstraints = {
                width: WIDTH,
                height: HEIGHT,
                facingMode
            };

            // if(facingMode === 'user') {
            //     camera = 'Front';
            // } else {
            //     camera = 'Back';
            // }
        }

        return(
            <Paper elevation={0} className={classes.root}>
                <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent : 'center',
                        alignItems: 'center'}}>
                    <Webcam 
                        id='video'
                        audio={false}
                        width={WIDTH}
                        height={HEIGHT}
                        ref = {this.webcam}
                        screenshotFormat='image/jpeg'
                        videoConstraints = {videoConstraints} 
                        style={{borderRadius:'20px'}}
                    />
                    <canvas 
                        style={{position: 'absolute'}} 
                        id='canvas' ref={this.canvas} 
                        width={WIDTH} 
                        height={HEIGHT}
                    />
                </div>
            </Paper>
        )
    }
}

export default withStyles(Styles)(VideoFeed);
