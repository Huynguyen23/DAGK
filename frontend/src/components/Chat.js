import React from 'react';
import $ from 'jquery';
import Messages from './MessageList';
import Input from './Input';
import { connect } from 'react-redux';
import _map from 'lodash/map';
import io from 'socket.io-client';

import '../App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo state,
        this.state = {
            messages: [
                {id: 1, userId: 0, message: 'Hello'}
            ],
            user: null
        }
        this.socket = null;
    }
    //Connetct với server nodejs, thông qua socket.io
    componentWillMount() {
        //this.socket = io('localhost:6969');
        this.props.socket.on('id', (res) => { console.log("USERA " + res.res), this.setState({user: res.res})}) // lắng nghe event có tên 'id'
        //console.log("user"+ this.state.user);
        this.props.socket.on('newMessage', (response) => { console.log("response " + response), this.newMessage(response)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
    }
    //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
    newMessage(m) {
        const messages = this.state.messages;
       
        let ids = _map(messages, 'id');
        let max = Math.max(...ids);
        console.log("current User " + this.state.user)
        console.log("max " + m.id)
        messages.push({
            id: max+1,
            userId: m.id,
            message: m.data
        });
        
        let objMessage = $('.messages');
        if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight ) {
            this.setState({messages});
            objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

        } else {
            this.setState({messages});
            if (m.id === this.state.user) {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
            }
        }
    }
    //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn
    sendnewMessage(m) {
        console.log("Đã vào!!!"+m.value);
        if (m.value) {
            this.props.socket.emit("newMessage", {value:m.value}); //gửi event về server
            m.value = ""; 
        }
       
    }

    render () {
        return (
           <div className="app__content">
              <div className="chat_window">
                  <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing}/>
                  <Input sendMessage={this.sendnewMessage.bind(this)}/>
              </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        socket:state.socket
    }
}
export default connect(mapStateToProps)(App)