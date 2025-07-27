import * as vscode from "vscode";
import { cacheLuaFiles } from "./modules/files";
import * as fs from "fs";
import { begin, close, run } from "./server/WebSocket";
import { sendNotif } from "./modules/window";

export function activate(context: vscode.ExtensionContext) {
    const commands: [String, vscode.Disposable][] = [
        ["manualChoose", vscode.commands.registerCommand("direxecute.manualChoose", async () => {
            try {
                const cachedFiles: string[] = await cacheLuaFiles();
                const quickPick: (string | undefined) = await vscode.window.showQuickPick(cachedFiles, {
                    canPickMany: false,
                    placeHolder: "Choose a file ..."
                });

                if (quickPick) {
                    const source: string = fs.readFileSync(quickPick, "utf-8");
                    run(source);
                }
            } catch (error) {
                sendNotif(`• Error in "manualChoose": "${error}" •`, "error");
            }
        })],
        ["autoChoose", vscode.commands.registerCommand("direxecute.autoChoose", async () => {
            const cachedFiles: string[] = await cacheLuaFiles();
            if (cachedFiles.length > 0) {
                const autoChosenFile: string = cachedFiles[0];
                const source: string = fs.readFileSync(autoChosenFile, "utf-8");
                run(source);

                // A little broken but I'll fix ts later :pray:
            } else {
                vscode.window.showWarningMessage("No Lua files found to choose.");
            }
        })],
        ["close", vscode.commands.registerCommand("direxecute.close", () => close())],
        ["begin", vscode.commands.registerCommand("direxecute.begin", () => begin())]
    ];

    for (const command of commands) {
        context.subscriptions.push(command[1]);
        console.log(`~ Assigned new command: "${command[0]}" :3 ~`);
    }
}

export function deactivate() { }