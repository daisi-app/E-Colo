"use strict";
const Discord = require('discord.js')
const bot = new Discord.Client()

const prefix = "!";

bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.username} ! (${bot.guilds.cache.size} server(s) dectected)`);
    //console.log(new Date((await bot.channels.cache.get("771431574364225550").messages.fetch()).get('782270457075335208').createdTimestamp));
});

bot.on('message', async message => {
    if (message.content === `${prefix}clean` && message.member.hasPermission('ADMINISTRATOR')) {
        let messagesListLength = 0;
        let stop = false;

        while (!stop) {
            const messagesList = await message.channel.messages.fetch({limit: 100});
            stop = messagesList.size === 0;
            messagesListLength += messagesList.size;
            await message.channel.bulkDelete(messagesList);
        }

        const messageContent = `:recycle: ${messagesListLength} ${messagesListLength > 0 ? 'messages':'message'} supprimés`;
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
    }

    if (message.content === `${prefix}clean` && !message.member.hasPermission('ADMINISTRATOR')) {
        await message.reply("Seul les administrateurs peuvent lancer cette commande");
    }
});

bot.login(process.env.BOT_TOKEN);
