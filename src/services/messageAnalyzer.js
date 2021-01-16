'use strict';
const {deleteMessage} = require("./clean");
const {helpMessage} = require("./help");
const {clean, help} = require("../constants/commands");

const analyseMessage = async (bot, message) => {
    const prefix = process.env.CMD_PREFIX;
    const msgCmd = message.content.split(' ');
    let execFunction;

    switch (msgCmd[0]) {
        case `${prefix}clean`:
            execFunction = clean;
            break;

        case `${prefix}help`:
            execFunction = help;
            break;

        default:
            execFunction = null;
    }

    if (execFunction && !message.member.hasPermission('ADMINISTRATOR')) {
        console.log('Il faut être administrateur pour lancer cette commande');
    } else if (execFunction && message.member.hasPermission('ADMINISTRATOR')) {
        if (execFunction === clean) {
            await deleteMessage(bot, message);
        } else if (execFunction === help) {
            helpMessage(message);
        }
    }
};

module.exports = {
    analyseMessage
};
