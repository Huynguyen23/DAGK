var express = require('express');
var app = express();
var _findIndex = require('lodash/findIndex') // npm install lodash --save
var server = require('http').Server(app);
var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
var io = require('socket.io')(server);
server.listen(port, () => console.log('Server running in port ' + port));

var userOnline = []; //danh sách user dang online
var Userto;
io.on('connection', function(socket) {
    console.log(socket.id + ': connected');
     userOnline.push(socket.id);
     console.log(userOnline);
    if(userOnline){
        for(let user in userOnline){
            if(userOnline[user] !== socket.id){
                Userto = userOnline[user];
                console.log('Userto '+Userto);
            }
            else{
                Userto = null;
            }
        }
    }

    io.sockets.sockets[socket.id].emit('id',{
        res: socket.id
    });
    //lắng nghe khi người dùng thoát
    socket.on('disconnect', function() {
        console.log(socket.id + ': disconnected')
        for(let user in userOnline){
            if(userOnline[user]===socket.id){
                userOnline.splice(user, 1);
            }
        }
        
        io.sockets.emit('updateUesrList', userOnline);

    })
    //lắng nghe khi có người gửi tin nhắn
    socket.on('newMessage', data => {
        console.log(data);
        //gửi lại tin nhắn cho tất cả các user dang online
        io.sockets.emit('newMessage', {
            data: data.value,
            id: socket.id
        });
    })

    socket.on('nextPlayer', data => {
        console.log(data);
        //gửi lại tin nhắn cho tất cả các user dang online
        var found = userOnline.find(function(element) { 
            return element != data.user; 
          });
            io.sockets.sockets[found].emit('nextPlayer', {
                i:data.i,
                j:data.j
            });
    })
    //lắng nghe khi có người login
    socket.on('login', data => {
        // kiểm tra xem tên đã tồn tại hay chưa
        if (userOnline.indexOf(data) >= 0) {
            socket.emit('loginFail'); //nếu tồn tại rồi thì gửi socket fail
        } else {
            // nếu chưa tồn tại thì gửi socket login thành công
            socket.emit('loginSuccess', data);
            userOnline.push({
                id: socket.id,
                name: data
            })
            io.sockets.emit('updateUesrList', userOnline);// gửi danh sách user dang online
        }
    })

});

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
})
