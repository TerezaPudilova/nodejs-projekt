"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerFactory = void 0;
const serverCloud_bootstrap_1 = require("../bootstrap/server/serverCloud.bootstrap");
class ServerFactory {
    /**
     * Function that return server instance depending on NODE_ENV variable value.
     *
     * @returns {ServerCloudBootstrap} Server instance for express application.
     */
    static getServerInstance() {
        const type = process.env.NODE_ENV;
        switch (type) {
            default:
                return new serverCloud_bootstrap_1.ServerCloudBootstrap();
        }
    }
}
exports.ServerFactory = ServerFactory;
//# sourceMappingURL=server.factory.js.map