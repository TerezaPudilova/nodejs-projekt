"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class DRLogger {
    constructor() {
        this.info = console.log;
        this.warn = console.warn;
        this.error = console.error;
        this.fatal = console.error;
    }
}
exports.logger = new DRLogger();
//# sourceMappingURL=tslogger.js.map