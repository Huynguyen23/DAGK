import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";

class Mode extends Component {
  handleInputChange(e) {
    e.preventDefault();
    this.props.onSetMode(true);
    this.props.history.push("/gamestart");
  }
  handleInputChange1(e) {
    e.preventDefault();
    this.props.onSetMode(false);
    this.props.history.push("/gamestart");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 m-auto">
            <h2 >GAME MENU</h2>
            <div className="btn-group-vertical">
              <button className="btn btn-primary" onClick={this.handleInputChange.bind(this)}>
                PLAY WITH PC
              </button>
              <br/>
              <button className="btn btn-primary" onClick={this.handleInputChange1.bind(this)}>
                PLAY ONLINE
              </button>
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
    errors: state.errors
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
