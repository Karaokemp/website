"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageResponse_1 = __importDefault(require("../helpers/packageResponse"));
async function uploadYoutubeVideo(videoId) {
    return packageResponse_1.default(`need to upload video ${videoId} from youtube!`);
}
exports.default = uploadYoutubeVideo;
