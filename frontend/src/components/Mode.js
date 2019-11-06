import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";

class Mode extends Component {
  constructor(props) {
    super(props);
    //Khởi tạo state,
    this.state = {
      key: "not connect"
    };
  }
 
  handleInputChange(e) {
    e.preventDefault();
    this.props.onSetMode(true);
    this.props.history.push("/gamestart");
  }
  handleInputChange1(e) {
    e.preventDefault();
    this.props.onSetMode(false);
    this.props.history.push("/gameonline");
  }

  render() {
    const loader = (
      <div className="col-md-6">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 m-auto">
            <h2>GAME MENU</h2>
            <div className="btn-group-vertical">
              <button
                className="btn btn-primary"
                onClick={this.handleInputChange.bind(this)}
              >
                PLAY WITH PC
              </button>
              <br />
              <button
                className="btn btn-primary"
                onClick={this.handleInputChange1.bind(this)}
              >
                PLAY ONLINE
              </button>
              {this.state.key === "connecting" ? loader : true}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
    p_socket: state.socket
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetMode: value => {
      dispatch(actions.setMode(value));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mode);
