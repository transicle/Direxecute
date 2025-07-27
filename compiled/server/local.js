"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendLocalName = appendLocalName;
const setup_1 = require("../setup");
function appendLocalName(ID, name) {
    const index = (0, setup_1.fetchUsers)().findIndex((user) => user.ID === ID);
    if (index !== -1) {
        (0, setup_1.fetchUsers)()[index].name = name;
    }
}
//# sourceMappingURL=local.js.map