"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function packageResponse(payload) {
    return {
        statusCode: 200,
        body: JSON.stringify(payload)
    };
}
exports.default = packageResponse;
