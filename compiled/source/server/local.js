"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendLocalName = appendLocalName;
exports.viewLive = viewLive;
/* eslint-disable curly */
const buttons_1 = require("../buttons");
const files_1 = require("../modules/files");
const setup_1 = require("../setup");
function appendLocalName(ID, name) {
    const index = (0, setup_1.fetchUsers)().findIndex((user) => user.ID === ID);
    if (index !== -1) {
        (0, setup_1.fetchUsers)()[index].name = name;
        (0, buttons_1.setButtons)();
    }
}
function viewLive() {
    if ((0, setup_1.fetchUsers)().length > 0 && (0, files_1.isRealFile)())
        (0, buttons_1.showButtons)();
    else
        (0, buttons_1.hideButtons)();
}
//# sourceMappingURL=local.js.map