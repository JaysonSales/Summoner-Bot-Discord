require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const keep_alive = require("../keep_alive.js");
const pingCommand = require("./commands/ping.js");
const helloCommand = require("./commands/hello.js");
const pongAction = require("./actions/ping.js");
const helloAction = require("./actions/hello.js");

const { MAINSERVERID, TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`);
  client.user.setActivity("Hello World");
  client.application.commands.create(pingCommand, MAINSERVERID);
  client.application.commands.create(helloCommand, MAINSERVERID);
});

//Log Message
const channel = ["850193107684425748"];
client.on("messageCreate", async (message) => {
  if (!channel.includes(message.channelId) || message.author.bot) return;

  return console.log(message.content);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  switch (commandName.toLowerCase()) {
    case "ping":
      pongAction.execute(interaction);
      break;
    case "hello":
      helloAction.execute(interaction);
      break;
  }
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.systemChannel;
  if (channel) {
    channel.send(`Welcome to the server, ${member}!`);
  }
});

client.login(TOKEN);
