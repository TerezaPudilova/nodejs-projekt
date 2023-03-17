"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBaseBootstrap = void 0;
const audit_server_1 = require("../../server/audit.server");
const default_controller_1 = require("../../controllers/default.controller");
const keys_controller_1 = require("../../controllers/keys.controller");
const key_service_1 = require("../../services/key.service");
const user_service_1 = require("../../services/user.service");
const auth_controller_1 = require("../../controllers/auth.controller");
class ServerBaseBootstrap {
    constructor(keyService, userService) {
        this.keyService = keyService;
        this.userService = userService;
        this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1;
        this.keyService = new key_service_1.KeyService();
        this.userService = new user_service_1.UserService();
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
            new default_controller_1.DefaultController(),
            new keys_controller_1.KeysController(this.keyService, this.userService),
            new auth_controller_1.AuthController(this.userService)
        ]);
        this.server.listen();
        return this.server.app;
    }
}
exports.ServerBaseBootstrap = ServerBaseBootstrap;
//# sourceMappingURL=serverBase.bootstrap.js.map