"use strict";
const Discord = require('discord.js')
const {analyseMessage} = require("./services/messageAnalyzer");
const bot = new Discord.Client()

bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.username} ! (${bot.guilds.cache.size} server(s) dectected)`);
    //console.log(new Date((await bot.channels.cache.get("771431574364225550").messages.fetch()).get('782270457075335208').createdTimestamp));
});

bot.on('message', async message => {
    await analyseMessage(bot, message);
});

bot.login(process.env.BOT_TOKEN);
