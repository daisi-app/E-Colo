'use strict';
const fs = require('fs');

const helpMessage = message => {
    let messageContent = fs.readFileSync('src/params/helpContent.txt');
    messageContent = messageContent.toString();
    messageContent = messageContent.split('{CMD_PREFIX}').join(process.env.CMD_PREFIX);
    message.channel.send(messageContent);
};

module.exports = {
    helpMessage
};
