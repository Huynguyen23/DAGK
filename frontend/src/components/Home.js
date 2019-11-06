import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  handleClickParent = state => {
    this.setState({
      email: state.email
    });
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/mode");
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 m-auto"></div>
          <div className="btn-group-vertical">
            <button type="button" className="btn btn-primary">
              Apple
            </button>
            <button type="button" cclassNamelass="btn btn-primary">
              Samsung
            </button>
            <button type="button" className="btn btn-primary">
              Sony
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Home);
