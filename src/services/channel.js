'use strict';

const deleteMessage = async (bot, message) => {
    let messagesListLength = 0;
    let stop = false;
    let promisesList = []

    setTimeout(() => stop = true, 180000);

    while (!stop) {
        const messageToDel = await message.channel.messages.fetch({limit: 100});

        if (messageToDel.size === 0) {
            stop = true;
        } else {
            for (const [index, value] of messageToDel) {
                promisesList.push(value.delete());
                messagesListLength++
            }

            await Promise.all(promisesList);
            promisesList = [];
        }
    }

    const messageContent = `:recycle: ${messagesListLength} ${messagesListLength > 1 ? 'messages supprimés':'message supprimé'}`;
    message.channel.send(messageContent);
    setTimeout(async () => {
        const messagesList = await message.channel.messages.fetch();

        for (const [key, value] of messagesList) {
            if (value.author.username === bot.user.username) {
                await message.channel.messages.delete(value);
                return;
            }
        }
    }, 6000);
};

module.exports = {
    deleteMessage
};
