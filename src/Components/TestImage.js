import React, { Component } from 'react';
import { loadModels, getFullFaceDescription } from '../Components/LoadModels';

const testImage = require('../image.jpeg');

const INITIAL_STATE = {
    imageURL : testImage,
    fullDesc : null,
    detections:  null
}

class TestImage extends Component{
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    componentDidMount = async () => {
        await loadModels();
        await this.handleImage(this.state.imageURL);
    }

    handleImage = async ( image = this.state.imageURL ) => {
        await getFullFaceDescription(image)
        .then(fullDesc => {
            if(!!fullDesc) {
                this.setState({
                    fullDesc, 
                    detections: fullDesc.map( fd => fd.detection)
                })
            }
        });
    };

    render(){
        
        const { imageURL, detections } = this.state;

        let drawBox = null;
        if(!!detections) {
            drawBox = detections.map((detection, i) => {
                let _H = detection.box.height;
                let _W = detection.box.width;
                let _X = detection.box._x;
                let _Y = detection.box._y;
                return (
                    <div key={i}>
                        <div
                            style={{position: 'absolute',
                            border: 'solid',
                            borderColor: 'blue',
                            height: _H * 0.7,
                            width: _W * 0.7,
                            transform: `translate(${_X}px,${_Y}px)`
                            }}
                        />
                    </div>
                )
            })
        }

        return(
            <div style={{position: 'relative'}}>
                <div style={{position: 'absolute'}}>
                    <img src={imageURL} alt='ImageMayne' width='70%' height='auto'/>
                    </div>
                {!!drawBox ? drawBox: null}
            </div>
        )
    }
}

export default TestImage;