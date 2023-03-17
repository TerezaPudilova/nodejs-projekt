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
    async getKey(keyId) {
        const key = this.db
            .collection("keys")
            .findOne({ id: keyId });
        return key;
    }
    async createKey(key) {
        this.db.collection("keys").insertOne(key);
    }
    async deleteKey(key) {
        this.db.collection("keys").deleteOne({ id: key.id });
    }
    async updateKey(key) {
        this.db.collection("keys").updateOne({ id: key.id }, { $set: key });
    }
}
exports.KeyDataAccess = KeyDataAccess;
//# sourceMappingURL=key.dataAccess.js.map