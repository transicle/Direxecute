/* eslint-disable curly */
import { WebSocket, WebSocketServer } from "ws";
import { addUser, clearUsers, fetchUsers, replaceUsers, setup, userObject } from "../setup";
import { sendNotif } from "../modules/window";

var server: (WebSocketServer | null);
export function loadServer(): void {
    server = new WebSocketServer({ port: setup.PORT });
    server.on("connection", (incomingWebSocket: WebSocket) => {
        addUser({
            ID: "User",
            WebSocket: incomingWebSocket
        });

        incomingWebSocket.on("close", () => replaceUsers(fetchUsers().filter((user) => user.ID !== "User")));
        incomingWebSocket.on("message", (data) => {
            if (data.toString() === `${setup.name}-Ping`) incomingWebSocket.send(`${setup.name}-Pong`);
        });
    });

    server.on("close", () => clearUsers());
}

export function run(source: string): void {
    const user = fetchUsers().find((user) => user.ID === "User");
    if (source.trim() !== "") {
        if (user) user.WebSocket?.send(source);
        else for (const user of fetchUsers()) user.WebSocket?.send(source);
    } else sendNotif("• Failed code delivery to client! •", "error");
}

export function begin(): void {
    if (!server) {
        loadServer();
        sendNotif("~ Started WebSocket connection :3 ~");
    } else sendNotif("• WebSocket connection is already live! •", "error");
}

export function close(): void {
    if (server) {
        server.close(() => sendNotif("~ Closed WebSocket connection! ~"));
        server = null;
    } else sendNotif("• There is no live WebSocket connection! •", "error");
}