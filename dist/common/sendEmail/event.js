"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_events_1 = require("node:events");
const eventEmaitter = new node_events_1.EventEmitter();
eventEmaitter.on("confirm-email", async (fn) => {
    fn();
});
exports.default = eventEmaitter;
//# sourceMappingURL=event.js.map