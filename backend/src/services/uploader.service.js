"use strict";
exports.__esModule = true;
var upload_1 = require("../functions/upload");
var INTERVAL = 3000;
var uploadService = /** @class */ (function () {
    function uploadService(state) {
        this.state = state;
    }
    uploadService.prototype.handleRequest = function () {
        var _this = this;
        if (this.state.requests.length && !this.state.downloading) {
            var request = this.state.requests.shift();
            this.state.downloading = request;
            console.log("handling request: " + request);
            upload_1["default"](request).then(function (song) {
                _this.state.readySongs.add(song);
                _this.state.downloading = null;
            })["catch"](function (err) {
                console.error(err.message);
            });
        }
    };
    uploadService.prototype.start = function () {
        console.log('start download service');
        setInterval(this.handleRequest.bind(this), INTERVAL);
    };
    return uploadService;
}());
exports["default"] = uploadService;
