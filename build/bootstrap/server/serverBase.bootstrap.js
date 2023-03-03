"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBaseBootstrap = void 0;
const audit_server_1 = require("../../server/audit.server");
const default_controller_1 = require("../../controllers/default.controller");
class ServerBaseBootstrap {
    constructor() {
        this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1;
    }
    /**
     * Function that serves as a template for server init.
     * @protected
     *
     * @returns {Promise<IServerInstances>} Return value is promise due to async character of the method.
     */
    async start() { return; }
    /**
     * Base method for server init derivative from old cloud settings.
     * @protected
     *
     * @returns {express.Application}
     */
    initServer() {
        const port = process.env.PORT || 8080;
        this.server = new audit_server_1.AuditServer(Number.parseInt(port.toString()), [
            new default_controller_1.DefaultController()
        ]);
        this.server.listen();
        return this.server.app;
    }
}
exports.ServerBaseBootstrap = ServerBaseBootstrap;
//# sourceMappingURL=serverBase.bootstrap.js.map