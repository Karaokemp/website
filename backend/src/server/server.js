"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var SERVER_PORT = 4000;
app_1["default"].listen(SERVER_PORT, function () {
    // tslint:disable-next-line:no-console
    console.log("Karaokemp backend is listenning on ports " + SERVER_PORT);
});
