"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultController = void 0;
const express = __importStar(require("express"));
const configFactory_1 = require("../factories/configFactory");
const DBConnections_1 = require("../services/databases/DBConnections");
class DefaultController {
    constructor() {
        this.router = express.Router();
        this.path = '/';
        this.config = configFactory_1.ConfigFactory.getConfig();
        this.indexHandler = async (req, res) => {
            res.redirect(this.config.dashboardPageUrl);
        };
        this.getHealthCheck = async (req, res) => {
            if (DBConnections_1.DBConnections.isConnected === false) {
                res.status(500).send('Database is not connected');
                return;
            }
            res.status(200).send('Audit server is running on version: ' + this.config.version);
        };
        this.initRouter();
    }
    initRouter() {
        this.router.get('/', this.indexHandler);
        this.router.get('/health-check', this.getHealthCheck);
    }
}
exports.DefaultController = DefaultController;
//# sourceMappingURL=default.controller.js.map