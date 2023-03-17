"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseDataAccess = void 0;
const configFactory_1 = require("../factories/configFactory");
const DBConnections_1 = require("../services/databases/DBConnections");
class DatabaseDataAccess {
    constructor() {
        this.connect().then();
    }
    async connect() {
        const dbConnection = DBConnections_1.DBConnections.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(configFactory_1.ConfigFactory.getConfig().mongoDatabase);
    }
}
exports.DatabaseDataAccess = DatabaseDataAccess;
//# sourceMappingURL=database.dataAccess.js.map