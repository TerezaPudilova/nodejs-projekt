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
const express_validator_1 = require("express-validator");
const check_1 = require("express-validator/check");
const bcrypt = require("bcryptjs");
class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.router = express.Router();
        this.path = "/";
        this.config = configFactory_1.ConfigFactory.getConfig();
        this.signupHandler = async (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            const body = req.body;
            const id = body.id;
            const email = body.email;
            const password = body.password;
            console.log(errors);
            if (!errors.isEmpty()) {
                const error = new Error("Validation failed.");
                error.stack = errors.array().toString();
                res.status(500).json({
                    message: "User signup was not successfull",
                    error: errors.array(),
                });
                throw error;
            }
            try {
                const hashedPassword = await bcrypt.hash(password, 12);
                await this.userService.signup(id, email, hashedPassword);
                res.status(200).json({
                    message: "User created successfully",
                    user: {
                        id: id,
                        email: email,
                    },
                });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        };
        this.loginHandler = async (req, res, next) => {
            const body = req.body;
            const email = body.email;
            const password = body.password;
            const loadedUser = await this.userService.login(email, password);
            try {
                //Validace emailu
                const loadedEmail = await this.userService.findUser(email);
                if (!loadedEmail) {
                    const error = new Error("Wrong email! Please try again.");
                    throw error;
                }
                //Validace hesla
                const isEqual = await bcrypt.compare(password, loadedUser.password);
                if (!isEqual) {
                    const error = new Error("Wrong password! Please try again.");
                    throw error;
                }
                res.status(200).json({
                    message: "User logged in successfully",
                    user: {
                        email: email,
                        keys: loadedUser.keys,
                    },
                });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        };
        this.findUserHandler = async (req, res, next) => {
            const loadedUser = await this.userService.findUser(req.email);
            try {
                res.status(200).json({
                    message: "User found successfully",
                    user: {
                        email: req.email,
                        keys: loadedUser.keys,
                    },
                });
            }
            catch (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            }
        };
        this.initRouter();
    }
    initRouter() {
        this.router.post("/signup", [
            (0, check_1.body)("email")
                .isEmail()
                .withMessage("Email must be in form name@example.com.")
                .custom(async (value, { req }) => {
                await this.userService.findUser(value).then((user) => {
                    if (user) {
                        return Promise.reject("E-mail address already exists");
                    }
                });
            })
                .normalizeEmail(),
            (0, check_1.body)("password")
                .trim()
                .isLength({ min: 6 })
                .withMessage("Password must have at least 6 characters."),
            (0, check_1.body)("confirmPassword")
                .trim()
                .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password confirmation does not match password");
                }
                return true;
            }),
        ], this.signupHandler);
        this.router.post("/login", this.loginHandler);
        this.router.get("/user", this.findUserHandler);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map