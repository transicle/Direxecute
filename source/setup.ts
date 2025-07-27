/* eslint-disable curly */
import { WebSocket } from "ws";

export interface userObject {
    ID?: string,
    WebSocket?: WebSocket
}

var users: userObject[] = [];
export function fetchUsers(): userObject[] { return users; }
export function addUser(user: userObject): void { users.push(user); }
export function clearUsers(): void { while (users.length > 0) users.pop(); }
export function replaceUsers(newUsers: userObject[]): void { users = newUsers; }
export const setup = {
    name: "Direxecute",
    PORT: 53203
};