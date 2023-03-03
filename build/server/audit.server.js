"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_middleware_1 = require("../middlewares/errorHandler.middleware");
const tslogger_1 = require("../logger/tslogger");
const location_middleware_1 = require("../middlewares/location.middleware");
const server_middleware_1 = require("../middlewares/server.middleware");
const process_1 = __importDefault(require("process"));
const bodyParser = require('body-parser');
const helmet = require("helmet");
const enforce = require('express-sslify');
class AuditServer {
    constructor(port, controllers) {
        this.app = (0, express_1.default)();
        this.app.use(helmet());
        this.app.use(server_middleware_1.serverMiddleware);
        this.app.use(location_middleware_1.locationMiddleware);
        if (process_1.default.env.FORCE_HTTPS && process_1.default.env.FORCE_HTTPS === "true") {
            this.app.use(enforce.HTTPS({ trustProtoHeader: true }));
        }
        this.port = port;
        this.app.use(bodyParser.json({ limit: "100mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.initControllers(controllers);
        this.app.use(errorHandler_middleware_1.errorHandlerMiddleware);
        this.showLocation();
    }
    showLocation() {
        const location = process_1.default.env.LOCATION;
        if (location) {
            tslogger_1.logger.info('Location: ', location);
        }
    }
    listen() {
        return this.app.listen(this.port, () => {
            tslogger_1.logger.info(`DecisionRules audit server listening on the port ${this.port}`);
        });
    }
    initControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }
}
exports.AuditServer = AuditServer;
//# sourceMappingURL=audit.server.js.map