import {MongoClient} from "mongodb";
const cluster = require('cluster');
import {ConfigFactory} from "../../factories/configFactory";
import {logger} from "../../logger/tslogger";

export class DBConnections {
    private static instance: DBConnections
    private readonly mongoClient: Promise<MongoClient>
    private readonly config = ConfigFactory.getConfig();
    public static isConnected = false;

    /***
     *
     * @param isMaster true if current thread is master from cluster
     */
    constructor(isMaster?: boolean) {
        logger.info('Creating Mongo client', this.config.mongoDbUri);
        this.mongoClient = MongoClient.connect(encodeURI(this.config.mongoDbUri)).then( async (res) => {
                logger.info('Mongo client connected!');
                DBConnections.isConnected = true;
                return res;
            }
        );
    }

    public static getInstance(){
        if (!DBConnections.instance){
            DBConnections.instance = new DBConnections(cluster.isMaster)
        }
        return DBConnections.instance;
    }

    public getMongoClient(){
        return this.mongoClient;
    }
}
