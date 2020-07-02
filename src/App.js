import React from "react";
import "./App.css";
import { Container, Paper, Grid } from "@material-ui/core";
import VideoFeed from "./Components/VideoFeed";
import Title from "./Components/Title";
import CurrentEmotion from "./Components/CurrentEmotion";
import RoboFace from "./Components/RoboFace";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      emotion: "",
      isFace: false,
    };
  }

  getCurrentEmotion = (emotion) => {
    this.setState({ emotion });
  };

  showLandmarks = (e) => {
    e.preventDefault();
    this.setState({
      showLandmarks: !this.state.showLandmarks,
    });
  };

  detectFace = (isFace) => {
    if (isFace) {
      this.setState({
        isFace: true,
      });
    } else {
      this.setState({
        isFace: false,
      });
    }
  };

  render() {
    return (
      <Container
        maxWidth="sm"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <Paper elevation={3} style={{ borderRadius: "20px" }}>
          <Title />
          <hr style={{ width: "60%" }} />
          <RoboFace isFace={this.state.isFace} emotion={this.state.emotion} />
          <VideoFeed
            detectFace={this.detectFace}
            getCurrentEmotion={this.getCurrentEmotion}
            getCurrentAge={this.getCurrentAge}
            getCurrentGender={this.getCurrentGender}
            showLandmarks={this.state.showLandmarks}
          />
          <hr style={{ width: "60%" }} />
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <CurrentEmotion isFace={this.state.isFace} emotion={this.state.emotion} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default App;
