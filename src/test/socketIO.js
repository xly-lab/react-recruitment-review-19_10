import io from 'socket.io-client'

const socket = io('ws://www.xiely.xyz/api');

socket.emit('sendMsg',{name:'abc'});

socket.on('receiveMsg',(data)=>{
    console.log('服务器向客户端发送的消息是：',data)
});
