/* eslint-disable curly */
import * as vscode from "vscode";
import { sendNotif } from "./window";
import * as fs from "fs";

export function fetchFileType(filePath?: string): string {
    function fetchPath(filePath: string): string {
        return filePath.substring(filePath.lastIndexOf("."));
    }
    if (filePath) {
        return fetchPath(filePath);
    } else {
        const focusedFile = vscode.window.activeTextEditor;
        if (focusedFile) {
            const fileName: string = focusedFile.document.fileName;
            return fetchPath(fileName);
        } else {
            sendNotif("• There was no chosen file. •", "error");
            return "unknown";
        }
    }
}

export const fileTypes: string[] = ["lua", "luau", "txt"];
export async function cacheLuaFiles(): Promise<string[]> {
    var cached: string[] = [];
    async function fetchFiles(): Promise<vscode.Uri[]> {
        try {
            return await vscode.workspace.findFiles("**/*.{lua,luau,txt}", "**/node_modules/**");
        } catch {
            return [];
        }
    }
    return fetchFiles()
        .then(files => {
            files.forEach(file => cached.push(file.fsPath));
            return cached;
        })
        .catch((reason: string) => {
            sendNotif(`• Couldn't cache Lua files: "${reason} •"`, "error");
            throw new Error(reason);
        });
}

export function fetchFileSource(filePath?: string): string {
    if (filePath) return fs.readFileSync(filePath, "utf-8");    
    else {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            return fs.readFileSync(editor.document.getText(), "utf-8");
        } else return "";
    }
}