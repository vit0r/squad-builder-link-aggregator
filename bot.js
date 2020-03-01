const tmi = require('tmi.js');
const process = require('process');

const client = new tmi.Client({
    options: { 
        debug: process.env.TMI_CLIENT_DEBUG,
        clientId: process.env.TMI_CLIENT_ID,
        clientSecret: process.env.TMI_CLIENT_SECRET
     },
	connection: {
		secure: true,
		reconnect: true
	},
	channels: [ process.env.TMI_CHAT_NAME ] // TODO: should be fill from API
});

client.connect();

console.log('CLIENT SECRET', process.env.TMI_CLIENT_ID);

client.on('message', (channel, tags, message, self) => {
    if(self) return;
    const isValidMessage = /\!fbsquad\s*(\d+)/g.test(message);
    if (isValidMessage){
        console.log(channel);
        console.log("POST http://localhost:3000/api/".concat(tags['room-id'], tags.username, message.replace("!fbsquad", "").trim()));
    }
});