"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigFactory = void 0;
const config_1 = require("../config");
class ConfigFactory {
    constructor() { }
    static getConfig() {
        const type = process.env.NODE_ENV;
        switch (type) {
            default:
                return (0, config_1.config)();
        }
    }
}
exports.ConfigFactory = ConfigFactory;
//# sourceMappingURL=configFactory.js.map