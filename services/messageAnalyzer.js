'use strict';
const {deleteMessage} = require("./channel");

const analyseMessage = async (bot, message) => {
    const prefix = process.env.CMD_PREFIX;
    const msgCmd = message.content.split(' ');
    let execFunction;

    switch (msgCmd[0]) {
        case `${prefix}clean`:
            // TODO: Clean actions
            execFunction = 'clean';
            break;

        case `${prefix}help`:
            // TODO: Help message
            execFunction = 'help';
            break;

        default:
            execFunction = null;
    }

    if (execFunction && !message.member.hasPermission('ADMINISTRATOR')) {
        console.log('Il faut être administrateur pour lancer cette commande');
    } else if (execFunction && message.member.hasPermission('ADMINISTRATOR')) {
        console.log(`Je veux exécuter la fonction ${execFunction}`);
        await deleteMessage(bot, message);
    }
};

module.exports = {
    analyseMessage
};
