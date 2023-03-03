"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnections = void 0;
const mongodb_1 = require("mongodb");
const cluster = require('cluster');
const configFactory_1 = require("../../factories/configFactory");
const tslogger_1 = require("../../logger/tslogger");
class DBConnections {
    /***
     *
     * @param isMaster true if current thread is master from cluster
     */
    constructor(isMaster) {
        this.config = configFactory_1.ConfigFactory.getConfig();
        tslogger_1.logger.info('Creating Mongo client', this.config.mongoDbUri);
        this.mongoClient = mongodb_1.MongoClient.connect(encodeURI(this.config.mongoDbUri)).then(async (res) => {
            tslogger_1.logger.info('Mongo client connected!');
            DBConnections.isConnected = true;
            return res;
        });
    }
    static getInstance() {
        if (!DBConnections.instance) {
            DBConnections.instance = new DBConnections(cluster.isMaster);
        }
        return DBConnections.instance;
    }
    getMongoClient() {
        return this.mongoClient;
    }
}
exports.DBConnections = DBConnections;
DBConnections.isConnected = false;
//# sourceMappingURL=DBConnections.js.map