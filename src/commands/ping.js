const { SlashCommandBuilder } = require("discord.js");

const pingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("This is a ping command");

module.exports = pingCommand;
