const dotenv = require('dotenv');
const Discord = require('discord.js');

dotenv.config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Bot is running');
});

client.login(process.env.DISCORD_BOT_TOKEN);
