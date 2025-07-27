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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const files_1 = require("./modules/files");
const fs = __importStar(require("fs"));
const WebSocket_1 = require("./server/WebSocket");
const window_1 = require("./modules/window");
function activate(context) {
    const commands = [
        ["manualChoose", vscode.commands.registerCommand("direxecute.manualChoose", async () => {
                try {
                    const cachedFiles = await (0, files_1.cacheLuaFiles)();
                    const quickPick = await vscode.window.showQuickPick(cachedFiles, {
                        canPickMany: false,
                        placeHolder: "Choose a file ..."
                    });
                    if (quickPick) {
                        const source = fs.readFileSync(quickPick, "utf-8");
                        (0, WebSocket_1.run)(source);
                    }
                }
                catch (error) {
                    (0, window_1.sendNotif)(`• Error in "manualChoose": "${error}" •`, "error");
                }
            })],
        ["autoChoose", vscode.commands.registerCommand("direxecute.autoChoose", async () => {
                const cachedFiles = await (0, files_1.cacheLuaFiles)();
                if (cachedFiles.length > 0) {
                    const autoChosenFile = cachedFiles[0];
                    const source = fs.readFileSync(autoChosenFile, "utf-8");
                    (0, WebSocket_1.run)(source);
                    // A little broken but I'll fix ts later :pray:
                }
                else {
                    vscode.window.showWarningMessage("No Lua files found to choose.");
                }
            })],
        ["close", vscode.commands.registerCommand("direxecute.close", () => (0, WebSocket_1.close)())],
        ["begin", vscode.commands.registerCommand("direxecute.begin", () => (0, WebSocket_1.begin)())]
    ];
    for (const command of commands) {
        context.subscriptions.push(command[1]);
        console.log(`~ Assigned new command: "${command[0]}" :3 ~`);
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map