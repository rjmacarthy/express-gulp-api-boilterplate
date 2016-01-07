var express = require('express'),
    http = require("http"),
    config = require("./config/config").config,
    app = express();

var app = require("./config/express")();

var server = http.createServer(app);

server.listen(config.port);

server.on("error", function() {
    console.log("error starting server");
});

server.on("listening", function() {
    console.log("Server started on port " + config.port);
});

module.exports = app;
