/* eslint-disable curly */
import * as vscode from "vscode";

export function sendNotif(message: string, type?: string): void {
    if (message.trim() === "") message = "No response.";
    const window = vscode.window;

    // Show different types of messages.
    if (type) {
        switch (type.toLowerCase().trim()) {
            case "info":
                window.showInformationMessage(message);
                break;
            case "warn":
                window.showWarningMessage(message);
                break;
            case "error":
                window.showErrorMessage(message);
                break;
            default:
                window.showInformationMessage(message);
        }
    } else window.showInformationMessage(message);
}