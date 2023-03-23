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
    async createUser(newUser) {
        this.db.collection("users").insertOne(newUser);
    }
    async findUser(email) {
        let redisUser;
        let userSetToRedis;
        redisUser = JSON.parse(await this.redisClient.get(`User cash:${email}`));
        if (redisUser === null) {
            const user = (await this.db
                .collection("users")
                .findOne({ email: email }));
            userSetToRedis = await this.redisClient.set(`User cash:${email}`, JSON.stringify(user));
            redisUser = JSON.parse(await this.redisClient.get(`User cash:${email}`));
            return redisUser;
        }
        return redisUser;
    }
    async createUserKey(email, key) {
        this.db
            .collection("users")
            .updateOne({ email: email }, { $addToSet: { keys: key } });
    }
    async deleteUserKey(email, key) {
        this.db
            .collection("users")
            .updateOne({ email: email }, { $pull: { keys: key } });
    }
}
exports.UserDataAccess = UserDataAccess;
//# sourceMappingURL=user.dataAccess.js.map