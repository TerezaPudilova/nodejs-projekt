"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenceKey = exports.ApiKey = void 0;
const base_key_model_1 = require("./base-key.model");
class ApiKey extends base_key_model_1.BaseKey {
    constructor(name, type, hash, id) {
        super(id, name, type, hash);
        this.name = name;
        this.type = type;
        this.hash = hash;
        this.id = id;
    }
}
exports.ApiKey = ApiKey;
class LicenceKey extends base_key_model_1.BaseKey {
    constructor(name, type, hash, id, expireDate) {
        super(id, name, type, hash);
        this.name = name;
        this.type = type;
        this.hash = hash;
        this.id = id;
        this.expireDate = expireDate;
    }
}
exports.LicenceKey = LicenceKey;
//# sourceMappingURL=key.model.js.map