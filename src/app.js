"use strict";
const Discord = require('discord.js')
const {analyseMessage} = require("./services/messageAnalyzer");
const bot = new Discord.Client()

bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.username} ! (${bot.guilds.cache.size} server(s) dectected)`);
    await bot.user.setPresence({ activity: { name: `${process.env.CMD_PREFIX}help`, type: 'LISTENING'}, status: 'online' })
});

bot.on('message', async message => {
    await analyseMessage(bot, message);
});

bot.login(process.env.BOT_TOKEN);
