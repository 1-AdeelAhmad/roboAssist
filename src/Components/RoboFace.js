import React, {useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import robotWaitingImg from "../images/face-waiting.png";
import robotTalkingImg from "../images/face-talking.png";
import * as GREETINGS from '../Greetings';

const RoboFace = ({ emotion, isFace }) => {
    const [cEmotion, setCEmotion] = useState('');

    const speak = (text) => {
        if(isFace) {
            if(emotion !== cEmotion) {
                getVoices(text)
                setCEmotion(emotion)
            }
        }
    }
    
    const getVoices = (text) => {
        const synth = window.speechSynthesis
        // const voices = window.speechSynthesis.getVoices()
        const uttherThis = new SpeechSynthesisUtterance(text)
        synth.speak(uttherThis)
        // speechSynthesis.cancel()
        // console.log('speaker', voices[51])
    }

  const getGreeting = (emotion) => {
    switch (emotion) {
      case "neutral":
          speak(GREETINGS.NEUTRAL)
        return GREETINGS.NEUTRAL;
      case "happy":
        speak(GREETINGS.HAPPY)
        return GREETINGS.HAPPY;
      case "sad":
        speak(GREETINGS.SAD)
        return GREETINGS.SAD;
      case "surprised":
        speak(GREETINGS.SURPRISED)
        return GREETINGS.SURPRISED;
      case "angry":
        speak(GREETINGS.ANGRY)
        return GREETINGS.ANGRY;
      default:
        return "";
    }
  };

  const getRoboFace = (isFace) => {
    return isFace ? robotTalkingImg : robotWaitingImg;
  };

  return (
    <Grid container justify="center">
      <Grid item xs={8} style={{ textAlign: "center" }}>
        <Paper style={{ padding: "1rem", height: "50vh" }}>
          <div id="roboImage">
            <img alt='roboface' src={getRoboFace(isFace)} />
          </div>
          {isFace ? getGreeting(emotion) : <p>Waiting For Client...</p>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RoboFace;
