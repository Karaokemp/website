"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MessageTheme = exports.SecondaryComponentMode = exports.YoutubeURLTypeError = exports.S3URL = exports.isYoutubePath = exports.YoutubeURL = exports.State = exports.SongSet = exports.KaraokempSong = exports.Song = void 0;
var Song = /** @class */ (function () {
    function Song(videoId, title, imagePath) {
        this.videoId = videoId;
        this.title = title;
        this.imageUrl = imagePath ? new URL(imagePath) : null;
    }
    return Song;
}());
exports.Song = Song;
var KaraokempSong = /** @class */ (function (_super) {
    __extends(KaraokempSong, _super);
    function KaraokempSong(videoId, title, imagePath, filename, cloudUrl) {
        var _this = _super.call(this, videoId, title, imagePath) || this;
        _this.filename = filename;
        _this.cloudUrl = cloudUrl;
        return _this;
    }
    return KaraokempSong;
}(Song));
exports.KaraokempSong = KaraokempSong;
var SongSet = /** @class */ (function () {
    function SongSet() {
        this.list = new Array();
    }
    SongSet.prototype.add = function (song) {
        if (!this.list.map(function (song) { return song.filename; }).includes(song.filename)) {
            this.list.push(song);
        }
    };
    return SongSet;
}());
exports.SongSet = SongSet;
var State = /** @class */ (function () {
    function State() {
        this.requests = new Array();
        this.readySongs = new SongSet();
        this.downloading = null;
    }
    return State;
}());
exports.State = State;
var YoutubeURL = /** @class */ (function (_super) {
    __extends(YoutubeURL, _super);
    function YoutubeURL(path) {
        return _super.call(this, path) || this;
    }
    return YoutubeURL;
}(URL));
exports.YoutubeURL = YoutubeURL;
function isYoutubePath(path) {
    var m = '^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+';
    var result = path.match(m);
    if (result) {
        return true;
    }
    else {
        return false;
    }
}
exports.isYoutubePath = isYoutubePath;
var S3URL = /** @class */ (function (_super) {
    __extends(S3URL, _super);
    function S3URL(path) {
        return _super.call(this, path) || this;
    }
    return S3URL;
}(URL));
exports.S3URL = S3URL;
var YoutubeURLTypeError = /** @class */ (function (_super) {
    __extends(YoutubeURLTypeError, _super);
    function YoutubeURLTypeError() {
        return _super.call(this, 'Not a Youtube Path!') || this;
    }
    return YoutubeURLTypeError;
}(TypeError));
exports.YoutubeURLTypeError = YoutubeURLTypeError;
var SecondaryComponentMode;
(function (SecondaryComponentMode) {
    SecondaryComponentMode[SecondaryComponentMode["BACKEND_STATE"] = 0] = "BACKEND_STATE";
    SecondaryComponentMode[SecondaryComponentMode["SONG_SUGGESTIONS"] = 1] = "SONG_SUGGESTIONS";
    SecondaryComponentMode[SecondaryComponentMode["NOTHING"] = 2] = "NOTHING";
})(SecondaryComponentMode = exports.SecondaryComponentMode || (exports.SecondaryComponentMode = {}));
var MessageTheme;
(function (MessageTheme) {
    MessageTheme[MessageTheme["ERROR"] = 0] = "ERROR";
    MessageTheme[MessageTheme["SUCCESS"] = 1] = "SUCCESS";
    MessageTheme[MessageTheme["NOTHING"] = 2] = "NOTHING";
})(MessageTheme = exports.MessageTheme || (exports.MessageTheme = {}));
