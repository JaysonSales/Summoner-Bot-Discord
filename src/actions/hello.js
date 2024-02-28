module.exports = {
  execute(interaction) {
    const userOption = interaction.options.getUser("user");
    if (userOption) {
      interaction.reply(`Hello, ${userOption.toString()}`);
    } else {
      interaction.reply("Hello there");
    }
  },
};
