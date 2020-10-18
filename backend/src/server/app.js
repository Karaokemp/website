"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var express_1 = require("express");
var uploader_service_1 = require("../services/uploader.service");
var songsFinder_service_1 = require("../services/songsFinder.service");
var app = express_1["default"]();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
var state = new types_1.State();
var uploader = new uploader_service_1["default"](state);
var finder = new songsFinder_service_1["default"]();
uploader.start();
app.get('/', function (req, res) { return res.send('Karaokemp backend is online!\n'); });
app.put('/link', function (req, res) {
    var link = new types_1.YoutubeURL("https://www.youtube.com/watch?v=" + req.body.videoId);
    state.requests.push(link);
    sendState(req, res);
});
app.get('/songs', function (req, res) {
    finder.find('karaoke creap radiohead').then(function (videos) {
        res.json(videos);
    });
});
app.get('/state', sendState);
function sendState(req, res) {
    res.json(state);
}
exports["default"] = app;
