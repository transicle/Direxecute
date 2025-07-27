"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadServer = loadServer;
exports.run = run;
exports.begin = begin;
exports.close = close;
/* eslint-disable curly */
const vscode = __importStar(require("vscode"));
const ws_1 = require("ws");
const setup_1 = require("../setup");
const ulidx_1 = require("ulidx");
const buttons_1 = require("../buttons");
const string_1 = require("../modules/string");
const local_1 = require("./local");
const files_1 = require("../modules/files");
var server;
function loadServer() {
    server = new ws_1.WebSocketServer({ port: setup_1.setup.PORT });
    server.on("connection", (incomingWebSocket) => {
        const ID = (0, ulidx_1.ulid)();
        var timeout;
        function defineTimeout() {
            if (timeout)
                clearTimeout(timeout);
            timeout = setTimeout(() => {
                incomingWebSocket.close();
            }), setup_1.setup.delayedLive;
        }
        defineTimeout();
        (0, setup_1.addUser)({
            ID,
            WebSocket: incomingWebSocket
        });
        (0, buttons_1.setButtons)();
        incomingWebSocket.on("message", (data) => {
            const message = data.toString();
            if (message === `${setup_1.setup.name}-checkOnline`) {
                incomingWebSocket.send(`${setup_1.setup.name}-keepOnline`);
                defineTimeout();
            }
            else {
                const name = (0, string_1.parseName)(message);
                (0, local_1.appendLocalName)(ID, name || "undefined");
            }
        });
        incomingWebSocket.on("close", () => {
            if (timeout)
                clearTimeout(timeout);
            const localUsers = (0, setup_1.fetchUsers)();
            (0, setup_1.replaceUsers)(localUsers.filter((user) => user.ID !== ID));
            (0, buttons_1.setButtons)();
        });
    });
    server.on("close", () => {
        (0, setup_1.clearUsers)();
        (0, buttons_1.setButtons)();
    });
}
function run(ID) {
    const user = ID !== "All" && (0, setup_1.fetchUsers)().find((user) => user.ID === ID);
    const source = (0, files_1.fetchFileSource)();
    if (source) {
        if (user)
            user.WebSocket?.send(source);
        else {
            for (const user of (0, setup_1.fetchUsers)()) {
                user.WebSocket?.send(source);
            }
        }
    }
}
function begin(context) {
    context.subscriptions.push(vscode.commands.registerCommand(setup_1.setup.command, run), vscode.window.onDidChangeActiveTextEditor(local_1.viewLive));
    loadServer();
    setInterval(local_1.viewLive, setup_1.setup.delay);
}
function close() {
    if (server)
        server.close();
    (0, buttons_1.removeButtons)();
}
//# sourceMappingURL=WebSocket.js.map