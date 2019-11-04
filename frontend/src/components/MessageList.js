import React from 'react';
import Message from './MessageItem';
import '../App.css';
export default class Messages extends React.Component {
    render () {
        return (
            <ul className="messages">
                
                {this.props.messages.map(item =>
                    <Message key={item.id} user = {item.userId === this.props.user? true: false} message={item.message}/>
                )}
            </ul>
        )
    }
}

