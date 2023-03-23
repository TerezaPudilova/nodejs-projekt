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
exports.KeysController = void 0;
const express = __importStar(require("express"));
const configFactory_1 = require("../factories/configFactory");
class KeysController {
    constructor(keyService, userService) {
        this.keyService = keyService;
        this.userService = userService;
        this.router = express.Router();
        this.path = "/";
        this.config = configFactory_1.ConfigFactory.getConfig();
        this.keysHandler = async (req, res, next) => {
            let userKeysIds = [];
            let userKeys = [];
            const query = req.query;
            const user = await this.userService.findUser(req.email);
            if (user) {
                user.keys.forEach((key) => {
                    userKeysIds.push(key);
                });
            }
            userKeys = await this.keyService.getKeys(userKeysIds, req.email);
            res.status(200).json({
                message: "Keys fetched successfully.",
                keys: userKeys,
            });
        };
        //res.status
        this.createKeyHandler = async (req, res, next) => {
            const body = req.body;
            const data = body.data;
            const email = body.email;
            try {
                await this.keyService.createKey(data, email);
                res.status(200).send();
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 400;
                    err.message = "Creating key was not possible";
                }
                next(err);
            }
        };
        //res.status
        this.deleteKeyHandler = async (req, res, next) => {
            const body = req.body;
            const data = body.data;
            const email = body.email;
            try {
                await this.keyService.deleteKey(data, email);
                res.status(200).send();
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 400;
                    err.message = "Deleting key was not possible";
                }
                next(err);
            }
        };
        //res.status
        this.updateKeyHandler = async (req, res, next) => {
            const body = req.body;
            const data = body.data;
            const email = req.email;
            try {
                await this.keyService.updateKey(data, email);
                res.status(200).send();
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 400;
                    err.message = "Updating key was not possible";
                }
                next(err);
            }
        };
        this.initRouter();
    }
    initRouter() {
        this.router.get("/keys", this.keysHandler);
        this.router.post("/create-key", this.createKeyHandler);
        this.router.delete("/delete-key", this.deleteKeyHandler);
        this.router.put("/update-key", this.updateKeyHandler);
    }
}
exports.KeysController = KeysController;
//# sourceMappingURL=keys.controller.js.map