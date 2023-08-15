const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
    console.log(c.user.username, 'is online!');
})

client.on('messageCreate', (message) => {
    console.log(message.content);
    console.log(message.author.username);

    if (message.author.bot) {
        return;
    }

    if (message.content === 'ping') {
        message.reply('pong');
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);
