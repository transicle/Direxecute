"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseName = parseName;
/* eslint-disable curly */
function parseName(message) {
    if (!message || message.length < 2)
        return "unknown";
    if (message.length > 10)
        return message.substring(0, 10) + "..";
    return message;
}
//# sourceMappingURL=string.js.map