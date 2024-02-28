const { SlashCommandBuilder } = require("discord.js");

const helloCommand = new SlashCommandBuilder()
  .setName("hello")
  .setDescription("Hello")
  .addUserOption(option =>
    option.setName("user").setDescription("Hello").setRequired(false)
  );

module.exports = helloCommand;
