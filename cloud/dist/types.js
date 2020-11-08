"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTheme = exports.SecondaryComponentMode = exports.YoutubeURLTypeError = exports.S3URL = exports.isYoutubePath = exports.YoutubeURL = exports.State = exports.SongSet = exports.KaraokempSong = exports.Song = void 0;
class Song {
    constructor(videoId, title, imagePath) {
        this.videoId = videoId;
        this.title = title;
        this.imageUrl = imagePath ? new URL(imagePath) : null;
    }
}
exports.Song = Song;
class KaraokempSong extends Song {
    constructor(videoId, title, imagePath, filename, cloudUrl) {
        super(videoId, title, imagePath);
        this.filename = filename;
        this.cloudUrl = cloudUrl;
    }
}
exports.KaraokempSong = KaraokempSong;
class SongSet {
    constructor() {
        this.list = new Array();
    }
    add(song) {
        if (!this.list.map(song => song.filename).includes(song.filename)) {
            this.list.push(song);
        }
    }
}
exports.SongSet = SongSet;
class State {
    constructor() {
        this.requests = new Array();
        this.readySongs = new SongSet();
        this.downloading = null;
    }
}
exports.State = State;
class YoutubeURL extends URL {
    constructor(path) {
        super(path);
    }
}
exports.YoutubeURL = YoutubeURL;
function isYoutubePath(path) {
    const m = '^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+';
    let result = path.match(m);
    if (result) {
        return true;
    }
    else {
        return false;
    }
}
exports.isYoutubePath = isYoutubePath;
class S3URL extends URL {
    constructor(path) {
        super(path);
    }
}
exports.S3URL = S3URL;
class YoutubeURLTypeError extends TypeError {
    constructor() {
        super('Not a Youtube Path!');
    }
}
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
