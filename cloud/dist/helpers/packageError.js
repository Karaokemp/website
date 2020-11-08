"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function packageError(statusCode, msg) {
    return {
        statusCode: statusCode,
        body: msg
    };
}
exports.default = packageError;
