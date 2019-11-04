import React, { Component } from 'react';
import { connect } from 'react-redux';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            password:'',
            errors: {}
        }
    }
    handleClickParent=(state)=>{
        this.setState ({
            email: state.email
        })
    };
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/mode');
            
        }
    }
    render() {
        return (
            <div>
                <label>Email: {this.state.email}</label>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps)(Home)