"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
exports.fetchUsers = fetchUsers;
exports.addUser = addUser;
exports.clearUsers = clearUsers;
exports.replaceUsers = replaceUsers;
var users = [];
function fetchUsers() { return users; }
function addUser(user) { users.push(user); }
function clearUsers() { while (users.length > 0)
    users.pop(); }
function replaceUsers(newUsers) { users = newUsers; }
exports.setup = {
    name: "Direxecute",
    PORT: 53203
};
//# sourceMappingURL=setup.js.map