var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var dataBase = require("./database");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/login"] = requestHandlers.login;
handle["/userInfo"] = requestHandlers.userInfo;
handle["/getGraph"] = requestHandlers.getGraph;

server.start(router.route, handle, dataBase);