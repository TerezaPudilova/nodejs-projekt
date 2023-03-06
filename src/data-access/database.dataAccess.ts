import { Db, MongoClient } from "mongodb";
import { ConfigFactory } from "../factories/configFactory";
import { DBConnections } from "../services/databases/DBConnections";

export class DatabaseDataAccess{
    client: MongoClient
    db: Db

    constructor() {
        this.connect().then()
    }

    async connect() {
        const dbConnection = DBConnections.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(ConfigFactory.getConfig().mongoDatabase)
    }
}