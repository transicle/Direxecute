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
exports.setup = void 0;
exports.fetchUsers = fetchUsers;
exports.addUser = addUser;
exports.clearUsers = clearUsers;
exports.replaceUsers = replaceUsers;
const vscode = __importStar(require("vscode"));
var users = [];
function fetchUsers() { return users; }
function addUser(user) { users.push(user); }
function clearUsers() { while (users.length > 0)
    users.pop(); }
function replaceUsers(newUsers) { users = newUsers; }
exports.setup = {
    name: "Direxecute",
    command: "direxecute.launch",
    buttons: {
        position: vscode.StatusBarAlignment.Right,
        priority: -10
    },
    PORT: 53203,
    delay: 500,
    delayedLive: 3000
};
//# sourceMappingURL=setup.js.map