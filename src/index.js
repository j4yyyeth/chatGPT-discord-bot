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
    if (message.author.bot) {
        return;
    }

    if (message.content === 'ping') {
        message.reply('pong');
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number');
        const num2 = interaction.options.get('second-number');
        interaction.reply(`${num1.value + num2.value}`);
    }

    if (interaction.commandName === 'prompt') {
        const prompt = interaction.options.get('prompt').value;
        interaction.reply(`${prompt}`);
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);
