import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
class Mode extends Component {
    handleInputChange(e) {
        e.preventDefault();
        this.props.onSetMode(true);
        this.props.history.push('/gamestart');
    }
    handleInputChange1(e) {
        e.preventDefault();
        this.props.onSetMode(false);
        this.props.history.push('/gamestart');
    }
    render() {
        return(
            <div>
                <button onClick={this.handleInputChange.bind(this)}>PLAY WITH PC</button>
                <button onClick={this.handleInputChange1.bind(this)}>2 PLAYERS</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
    auth: state.auth,
    errors: state.errors
   }
};
const mapDispatchToProps = (dispatch, props)=>{
    return {
        onSetMode : (value) => {
            dispatch(actions.setMode(value))
        }
    }
}
export  default connect(mapStateToProps, mapDispatchToProps)(Mode)