"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnections = void 0;
const mongodb_1 = require("mongodb");
const redis_1 = require("redis");
const cluster = require("cluster");
const configFactory_1 = require("../../factories/configFactory");
const tslogger_1 = require("../../logger/tslogger");
class DBConnections {
    /***
     *
     * @param isMaster true if current thread is master from cluster
     */
    constructor(isMaster) {
        this.config = configFactory_1.ConfigFactory.getConfig();
        tslogger_1.logger.info("Creating Mongo client", this.config.mongoDbUri);
        this.mongoClient = mongodb_1.MongoClient.connect(encodeURI(this.config.mongoDbUri)).then(async (res) => {
            tslogger_1.logger.info("Mongo client connected!");
            DBConnections.isConnected = true;
            return res;
        });
        //hodit do samostatne tridy - oddelit mongo a redis
        this.redisClient = (0, redis_1.createClient)({
            password: this.config.redisPassword,
            socket: {
                port: this.config.redisPort,
                host: this.config.redisHost,
            },
        });
        this.redisClient.connect();
        this.getRedisClient();
        this.redisClient.on("ready", async (mess) => {
            console.log("Message", mess);
        });
        this.redisClient.on("error", async (err) => {
            console.log("Error", err);
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
    async getRedisClient() {
        // this.redisClient.ping("message").then((mess) => {
        //   console.log(mess);
        // });
        await this.redisClient.connect;
    }
}
exports.DBConnections = DBConnections;
DBConnections.isConnected = false;
//# sourceMappingURL=DBConnections.js.map