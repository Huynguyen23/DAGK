import io from 'socket.io-client';
const link = io('localhost:6969')

const socket = (state = link, action) => {
    return state
}
export default socket