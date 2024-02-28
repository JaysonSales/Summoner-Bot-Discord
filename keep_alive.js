var http = require("http");

http
  .createServer(function (_, res) {
    res.write("Bot is now connected");
    res.end();
  })
  .listen(10000);
