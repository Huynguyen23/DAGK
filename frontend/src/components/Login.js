import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {},
      status: "connected",
      authResponse: {
        accessToken: "...",
        expiresIn: "...",
        signedRequest: "...",
        userID: "..."
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/mode");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/mode");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 m-auto">
            <h2>Login</h2>
            <div className="image-upload">
              <label for="file-input">
                <img src="././images/icons8-client-management-64.png" />
              </label>

              <input id="file-input" type="file" hidden/>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Login User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
