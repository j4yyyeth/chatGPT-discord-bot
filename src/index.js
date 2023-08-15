const { Client, IntentsBitField } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

client.on("ready", (c) => {
  console.log(c.user.username, "is online!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "ping") {
    message.reply("pong");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  // ping command 
  if (interaction.commandName === "ping") {
    interaction.reply("pong!");
  }

  // add command 
  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`${num1 + num2}`);
  }

  // game command 
  if (interaction.commandName === "game") {
    const word = interaction.options.get("word").value.split('');
    for (let i = word.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [word[i], word[j]] = [word[j], word[i]];
    }
    const mixedWord = word.join('');
    interaction.reply(mixedWord);
  }

  // prompt command 
  if (interaction.commandName === "prompt") {
    const prompt = interaction.options.get("prompt").value;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
    });

    try {
      interaction.reply(response.data.choices[0].text);
    } catch (err) {
      console.log(err);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
