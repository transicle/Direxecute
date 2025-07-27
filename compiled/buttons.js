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
exports.newButton = newButton;
exports.removeButtons = removeButtons;
exports.setButtons = setButtons;
exports.showButtons = showButtons;
exports.hideButtons = hideButtons;
/* eslint-disable curly */
const vscode = __importStar(require("vscode"));
const setup_1 = require("./setup");
const local_1 = require("./server/local");
var pressables = [];
var userIndex = 0;
function newButton(user) {
    const ID = user?.ID || "All";
    const name = user?.name || userIndex++;
    const defaultUser = `Run on ${user ? name : "All"}`;
    const pressable = vscode.window.createStatusBarItem(setup_1.setup.buttons.position, setup_1.setup.buttons.priority - userIndex);
    pressable.text = defaultUser;
    pressable.command = {
        title: `Direxecute ~ ${defaultUser}`,
        command: setup_1.setup.command,
        arguments: [ID]
    };
    if (user)
        userIndex++;
    pressables.push({
        pressable,
        ID
    });
}
function removeButtons() {
    for (const { pressable } of pressables) {
        pressable.dispose();
    }
    pressables = [];
}
function setButtons() {
    removeButtons();
    userIndex = 0;
    console.log("1");
    console.warn((0, setup_1.fetchUsers)(), setup_1.fetchUsers.length, setup_1.fetchUsers.length > 1);
    if ((0, setup_1.fetchUsers)().length > 1)
        newButton();
    for (const user of (0, setup_1.fetchUsers)()) {
        newButton(user);
    }
    (0, local_1.viewLive)();
}
function showButtons() {
    for (const { pressable } of pressables) {
        pressable.show();
    }
}
function hideButtons() {
    for (const { pressable } of pressables) {
        pressable.hide();
    }
}
//# sourceMappingURL=buttons.js.map