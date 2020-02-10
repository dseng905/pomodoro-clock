import React from 'react';
import './App.css';


class Adjuster extends React.Component {
  render() {
    return (
      <div>
        <p className="adjuster-name">{this.props.name}</p>
        <div className="Adjuster">
          <button className="adjuster-button" onClick={this.props.type} value={"-"}>&lt;</button> 
          <p className="adjuster-display">{this.props.value}</p>
          <button className="adjuster-button" onClick={this.props.type} value={"+"}>&gt;</button>
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      workLength: 25,
      timer: 1500,
      timerID: "",
      mode: "beginning",
      isBreak: false
    }

    this.decrementTime = this.decrementTime.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.playTime = this.playTime.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.adjustBreakLength = this.adjustBreakLength.bind(this);
    this.adjustWorkLength = this.adjustWorkLength.bind(this);
  }

  decrementTime() {
    if(this.state.timer > 0) {
      this.setState(
        {
          timer: this.state.timer - 1
        }
      )
    }
    else if (this.state.isBreak) {
      this.setState({
          timer: this.state.workLength*60,
          isBreak: false
      })
    }
    else{
      this.setState({
        timer: this.state.breakLength*60,
        isBreak: true
      })
    }
  }

  displayTime() {
    let minutes = Math.floor(this.state.timer/60);
    let seconds = this.state.timer - minutes*60;
    let timeStr = minutes + ":" +
                    (seconds < 10 ? "0" : "") +
                    seconds;
    return timeStr;
  }

  playTime() {
    if(this.state.mode === "paused" || this.state.mode === "beginning") {
      this.setState({
        timerID: setInterval(this.decrementTime,1000),
        mode: "play"
      })
    }
  }

  stopTime() {
    clearInterval(this.state.timerID);
    this.setState({
      mode: "paused"
    });
  }

  resetTime() {
    clearInterval(this.state.timerID);
    this.setState({
      timer: this.state.workLength*60,
      timerID: "",
      mode: "beginning",
      isBreak: false
    })
  }

  adjustBreakLength(e){
    if(e.currentTarget.value === "+" && this.state.breakLength > 0 && this.state.breakLength < 1000) {
      this.setState({
        breakLength: this.state.breakLength + 1,
      })
    }
    else if (e.currentTarget.value === "-" && this.state.breakLength > 1){
      this.setState({
        breakLength: this.state.breakLength - 1,
      })
    }
   
  }

  adjustWorkLength(e){
    let newLength = 0;
    if(e.currentTarget.value === "+" && this.state.workLength > 0 && this.state.workLength < 1000) {
      newLength = this.state.workLength + 1;
      this.setState({
        workLength: newLength,
      })
    }
    else if (e.currentTarget.value === "-" && this.state.workLength > 1) {
      newLength = this.state.workLength - 1;
      this.setState({
        workLength: newLength,
      })
    }

    if(this.state.mode === "beginning") {
      this.setState({
        timer: newLength*60
      })
    }
  }


  render() {
    return (
      <div>
        <div className="clock-control">
          <div className="clock-display">
            <p id="clock-display-mode">{this.state.isBreak ? "Break" : "Work"}</p>
            <p id="clock-display-time">{this.displayTime()}</p>
          </div>
          <div className="clock-button-set">
            <button className="clock-button" onClick={this.playTime}>Play</button>
            <button className="clock-button" onClick={this.stopTime}>Pause</button>
            <button className="clock-button" onClick={this.resetTime}>Reset</button>
          </div>
          <Adjuster 
            name={"Break Length"} 
            type={this.adjustBreakLength}
            value={this.state.breakLength} 
          />
          <Adjuster 
            name={"Work Length"}
            type={this.adjustWorkLength} 
            value={this.state.workLength}
          />
        </div>
      </div>
      
    );
  }
}

function App() {
  return (
    <div className="App">
      <Timer />
      <p id="title">Pomodoro Clock</p>
      <p id="author">by Davin Seng</p>
    </div>
  );
}

export default App;
