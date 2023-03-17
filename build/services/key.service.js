"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyService = void 0;
const key_dataAccess_1 = require("../data-access/key.dataAccess");
const uuid_1 = require("uuid");
const user_dataAccess_1 = require("../data-access/user.dataAccess");
class KeyService {
    constructor() {
        this.keyDataAccess = key_dataAccess_1.KeyDataAccess.getInstance();
        this.userDataAccess = user_dataAccess_1.UserDataAccess.getInstance();
    }
    async getKey(keyId) {
        const keys = await this.keyDataAccess.getKey(keyId);
        return keys;
    }
    async createKey(key, email) {
        const uuid = (0, uuid_1.v4)();
        const hash = (0, uuid_1.v4)();
        key.id = uuid;
        key.hash = hash;
        await this.userDataAccess.createUserKey(email, key.id);
        await this.keyDataAccess.createKey(key);
    }
    async deleteKey(key, email) {
        await this.userDataAccess.deleteUserKey(email, key.id);
        await this.keyDataAccess.deleteKey(key);
    }
    async updateKey(key) {
        await this.keyDataAccess.updateKey(key);
    }
}
exports.KeyService = KeyService;
//# sourceMappingURL=key.service.js.map