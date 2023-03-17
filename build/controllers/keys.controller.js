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
const AuthMiddleware = require("../middlewares/auth");
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
            //const keyId = query.keyId;
            const user = await this.userService.findUser(req.email);
            if (user) {
                user.keys.forEach((key) => {
                    userKeysIds.push(key);
                });
            }
            for (const keyId of userKeysIds) {
                const key = await this.keyService.getKey(keyId);
                userKeys.push(key);
            }
            // console.log(userKeys)
            res.status(200).json({
                message: "Keys fetched successfully.",
                keys: userKeys
            });
        };
        this.createKeyHandler = async (req, res, next) => {
            const body = req.body;
            const data = body.data;
            const email = body.email;
            //(body);
            await this.keyService.createKey(data, email);
            // await this.userService.setUserKey(email, keyId);
            res.status(200).json({
                message: "User key created successfully",
                user: {
                    email: email,
                    key: data,
                },
            });
        };
        this.deleteKeyHandler = async (req, res, next) => {
            const body = req.body;
            const data = body.data;
            // const key = body.key
            const email = body.email;
            //console.log(body);
            await this.keyService.deleteKey(data, email);
            // await this.userService.deleteUserKey(email, key);
            res.status(200).json({
                message: "Key deleted successfully",
                key: data
            });
        };
        this.updateKeyHandler = async (req, res, next) => {
            const body = req.body;
            const data = body.data;
            await this.keyService.updateKey(data);
            res.status(200).json({
                message: "Key updated successfully",
                key: data
            });
        };
        this.initRouter();
    }
    //presunout do audit.server.ts
    initRouter() {
        this.router.get("/keys", AuthMiddleware, this.keysHandler);
        this.router.post("/create-key", AuthMiddleware, this.createKeyHandler);
        this.router.delete("/delete-key", AuthMiddleware, this.deleteKeyHandler);
        this.router.put("/update-key", AuthMiddleware, this.updateKeyHandler);
    }
}
exports.KeysController = KeysController;
//# sourceMappingURL=keys.controller.js.map