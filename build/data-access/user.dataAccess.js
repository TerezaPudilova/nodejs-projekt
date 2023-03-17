"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataAccess = void 0;
const database_dataAccess_1 = require("./database.dataAccess");
class UserDataAccess extends database_dataAccess_1.DatabaseDataAccess {
    constructor() {
        super();
    }
    static getInstance() {
        if (!UserDataAccess.instance) {
            UserDataAccess.instance = new UserDataAccess();
        }
        return UserDataAccess.instance;
    }
    //obecnejsi nazev - createUser - na vstupu prijde model usera
    async createUser(newUser) {
        this.db.collection("users").insertOne(newUser);
    }
    async findUser(email) {
        const user = (await this.db
            .collection("users")
            .findOne({ email: email }));
        return user;
    }
    async createUserKey(email, key) {
        this.db
            .collection("users")
            .updateOne({ email: email }, { $addToSet: { keys: key } });
    }
    async deleteUserKey(email, key) {
        this.db.collection("users")
            .updateOne({ email: email }, { $pull: { keys: key } });
    }
}
exports.UserDataAccess = UserDataAccess;
//# sourceMappingURL=user.dataAccess.js.map