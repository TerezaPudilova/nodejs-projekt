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
exports.AuthController = void 0;
const express = __importStar(require("express"));
const configFactory_1 = require("../factories/configFactory");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middlewares/auth");
class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.router = express.Router();
        this.path = "/";
        this.config = configFactory_1.ConfigFactory.getConfig();
        this.signupHandler = async (req, res, next) => {
            const body = req.body;
            const id = body.id;
            const email = body.email;
            const password = body.password;
            await this.userService.signup(id, email, password);
            res.status(200).json({
                message: "User created successfully",
                user: {
                    id: id,
                    email: email,
                },
            });
            //TODO: dodelat handlovani erroru
        };
        this.loginHandler = async (req, res, next) => {
            const body = req.body;
            const email = body.email;
            const password = body.password;
            const loadedUser = await this.userService.login(email, password);
            res.status(200).json({
                message: "User logged in successfully",
                user: {
                    email: email,
                    keys: loadedUser.keys,
                },
            });
        };
        this.findUserHandler = async (req, res, next) => {
            const loadedUser = await this.userService.findUser(req.email);
            res.status(200).json({
                message: "User updated successfully",
                user: {
                    email: req.email,
                    keys: loadedUser.keys,
                },
            });
        };
        this.initRouter();
    }
    initRouter() {
        this.router.post("/signup", this.signupHandler);
        this.router.post("/login", this.loginHandler);
        this.router.get("/user", AuthMiddleware, this.findUserHandler);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map