"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const headline_1 = require("./assets/icons/headline");
const server_factory_1 = require("./factories/server.factory");
const tslogger_1 = require("./logger/tslogger");
console.log(headline_1.decisionRules);
/**
 * Server constant that hold server instance.
 * @type {ServerCloudBootstrap}
 */
const server = server_factory_1.ServerFactory.getServerInstance();
const DRAudit = async () => {
    try {
        const result = await server.start();
        exports.app = result.app;
    }
    catch (e) {
        tslogger_1.logger.warn("Test vars not set");
        return;
    }
};
DRAudit().then();
//# sourceMappingURL=index.js.map