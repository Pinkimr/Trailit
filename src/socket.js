import io from 'socket.io-client'

import {SOCKET} from './action/endpoint'

const socket = io(SOCKET, {transports: ['polling'], secure: true})

export default socket
