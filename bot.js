const dotenv = require('dotenv');
const Discord = require('discord.js');
const fs = require('fs');

const prefix = '!';

dotenv.config();
const client = new Discord.Client();
client.commands = new Discord.Collection();

commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Bot is running');
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  console.log(args);
  const command = args.shift().toLowerCase();
  console.log(command);

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Command could not be executed');
  }
});
