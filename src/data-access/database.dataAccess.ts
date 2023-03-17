import { Db, MongoClient } from "mongodb";
import { RedisClientType } from "redis";
import { ConfigFactory } from "../factories/configFactory";
import { DBConnections } from "../services/databases/DBConnections";

export class DatabaseDataAccess {
  client: MongoClient;
  db: Db;
  redisClient: RedisClientType;

  constructor() {
    this.connect().then();
  }

  async connect() {
    const dbConnection = DBConnections.getInstance();
    this.client = await dbConnection.getMongoClient();
    this.db = this.client.db(ConfigFactory.getConfig().mongoDatabase);
    this.redisClient = dbConnection.redisClient;
    //console.log(this.redisClient)
    // this.redisClient.ping("message").then((mess) => {
    //     console.log(mess);
    //   });
    const redisIsReady = this.redisClient.isReady;
    const redisIsOpen = this.redisClient.isOpen;
    console.log("Je redis ready? - ", redisIsReady);
    console.log("Je redis open? - ", redisIsOpen);
  }
}
