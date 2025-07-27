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
exports.fileTypes = void 0;
exports.fetchFileType = fetchFileType;
exports.cacheLuaFiles = cacheLuaFiles;
exports.isRealFile = isRealFile;
exports.fetchFileSource = fetchFileSource;
/* eslint-disable curly */
const vscode = __importStar(require("vscode"));
const window_1 = require("./window");
const fs = __importStar(require("fs"));
function fetchFileType(filePath) {
    function fetchPath(filePath) {
        return filePath.substring(filePath.lastIndexOf("."));
    }
    if (filePath) {
        return fetchPath(filePath);
    }
    else {
        const focusedFile = vscode.window.activeTextEditor;
        if (focusedFile) {
            const fileName = focusedFile.document.fileName;
            return fetchPath(fileName);
        }
        else {
            (0, window_1.sendNotif)("• There was no chosen file. •", "error");
            return undefined;
        }
    }
}
exports.fileTypes = ["lua", "luau", "txt"];
async function cacheLuaFiles() {
    var cached = [];
    async function fetchFiles() {
        return await vscode.workspace.findFiles("**/*.{lua,luau,txt}", "**/node_modules/**");
    }
    return fetchFiles()
        .then(files => {
        files.forEach(file => cached.push(file.fsPath));
        return cached;
    })
        .catch((reason) => {
        (0, window_1.sendNotif)(`• Couldn't cache Lua files: "${reason} •"`, "error");
        throw new Error(reason);
    });
}
function isRealFile(filePath) {
    const extension = fetchFileType(filePath);
    return (extension && exports.fileTypes.includes(extension)) || false;
}
function fetchFileSource(filePath) {
    if (filePath)
        return fs.readFileSync(filePath, "utf-8");
    else {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            return fs.readFileSync(editor.document.getText(), "utf-8");
        }
        else
            return undefined;
    }
}
//# sourceMappingURL=files.js.map