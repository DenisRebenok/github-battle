import React from "react";
import PropTypes from "prop-types";

var styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
  };
  static defaultProps = {
    text: "Loading",
    speed: 300
  };
  state = {
    text: this.props.text
  };
  componentDidMount() {
    var stopper = this.props.text + "...";
    this.interval = window.setInterval(
      function() {
        if (this.state.text === stopper) {
          return {
            text: this.props.text
          };
        } else {
          this.setState(function(prevState) {
            return {
              text: prevState.text + "."
            };
          });
        }
      }.bind(this),
      this.props.speed
    );
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

export default Loading;
