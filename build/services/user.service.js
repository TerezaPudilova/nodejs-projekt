"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_dataAccess_1 = require("../data-access/user.dataAccess");
//const { validationResult } = require("express-validator/check");
//import { bcrypt } from "../../node_modules/bcrypt";
const bcrypt = require("bcrypt");
const user_1 = require("../models/user");
class UserService {
    constructor() {
        this.userDataAccess = user_dataAccess_1.UserDataAccess.getInstance();
    }
    async signup(id, email, password) {
        const keys = [];
        const newUser = new user_1.User(id, email, keys, password);
        await this.userDataAccess.createUser(newUser);
    }
    async login(email, password) {
        const loadedUser = await this.userDataAccess.findUser(email);
        return loadedUser;
    }
    async findUser(email) {
        const user = await this.userDataAccess.findUser(email);
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map