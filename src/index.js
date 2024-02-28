require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const keep_alive = require("../keep_alive.js")
const pingCommand = require("./commands/ping.js");
const helloCommand = require("./commands/hello.js");
const pongAction = require("./actions/ping.js");
const helloAction = require("./actions/hello.js");

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

  client.application.commands.create(pingCommand, process.env.MAINSERVERID);
  client.application.commands.create(helloCommand, process.env.MAINSERVERID);
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

client.login(process.env.TOKEN);
