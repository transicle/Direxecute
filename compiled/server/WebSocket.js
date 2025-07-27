"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadServer = loadServer;
exports.run = run;
exports.begin = begin;
exports.close = close;
/* eslint-disable curly */
const ws_1 = require("ws");
const setup_1 = require("../setup");
const window_1 = require("../modules/window");
var server;
function loadServer() {
    server = new ws_1.WebSocketServer({ port: setup_1.setup.PORT });
    server.on("connection", (incomingWebSocket) => {
        (0, setup_1.addUser)({
            ID: "User",
            WebSocket: incomingWebSocket
        });
        incomingWebSocket.on("close", () => (0, setup_1.replaceUsers)((0, setup_1.fetchUsers)().filter((user) => user.ID !== "User")));
        incomingWebSocket.on("message", (data) => {
            if (data.toString() === `${setup_1.setup.name}-Ping`)
                incomingWebSocket.send(`${setup_1.setup.name}-Pong`);
        });
    });
    server.on("close", () => (0, setup_1.clearUsers)());
}
function run(source) {
    const user = (0, setup_1.fetchUsers)().find((user) => user.ID === "User");
    if (source.trim() !== "") {
        if (user)
            user.WebSocket?.send(source);
        else
            for (const user of (0, setup_1.fetchUsers)())
                user.WebSocket?.send(source);
    }
    else
        (0, window_1.sendNotif)("• Failed code delivery to client! •", "error");
}
function begin() {
    if (!server) {
        loadServer();
        (0, window_1.sendNotif)("~ Started WebSocket connection :3 ~");
    }
    else
        (0, window_1.sendNotif)("• WebSocket connection is already live! •", "error");
}
function close() {
    if (server) {
        server.close(() => (0, window_1.sendNotif)("~ Closed WebSocket connection! ~"));
        server = null;
    }
    else
        (0, window_1.sendNotif)("• There is no live WebSocket connection! •", "error");
}
//# sourceMappingURL=WebSocket.js.map