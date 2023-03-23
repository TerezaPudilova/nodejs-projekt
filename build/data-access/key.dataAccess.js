"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDataAccess = void 0;
const database_dataAccess_1 = require("./database.dataAccess");
class KeyDataAccess extends database_dataAccess_1.DatabaseDataAccess {
    constructor() {
        super();
    }
    static getInstance() {
        if (!KeyDataAccess.instance) {
            KeyDataAccess.instance = new KeyDataAccess();
        }
        return KeyDataAccess.instance;
    }
    async getKeys(keyIds, email) {
        let keysToReturn = [];
        let redisKeysToReturn = [];
        redisKeysToReturn = JSON.parse(await this.redisClient.get(`All userKeys cash:${email}`));
        //console.log(redisKeysToReturn);
        if (redisKeysToReturn === null) {
            const keys = (await this.db
                .collection("keys")
                .find({ id: { $in: keyIds } }));
            await keys.forEach((key) => {
                keysToReturn.push(key);
            });
            this.redisClient.set(`All userKeys cash:${email}`, JSON.stringify(keysToReturn));
            redisKeysToReturn = JSON.parse(await this.redisClient.get(`All userKeys cash:${email}`));
        }
        return redisKeysToReturn;
    }
    async createKey(key, email) {
        this.redisClient.del(`All userKeys cash:${email}`);
        this.redisClient.del(`User cash:${email}`);
        this.db.collection("keys").insertOne(key);
    }
    async deleteKey(key, email) {
        this.redisClient.del(`All userKeys cash:${email}`);
        this.redisClient.del(`User cash:${email}`);
        this.db.collection("keys").deleteOne({ id: key.id });
    }
    async updateKey(key, email) {
        this.redisClient.del(`All userKeys cash:${email}`);
        this.redisClient.del(`User cash:${email}`);
        this.db.collection("keys").updateOne({ id: key.id }, { $set: key });
    }
}
exports.KeyDataAccess = KeyDataAccess;
//# sourceMappingURL=key.dataAccess.js.map