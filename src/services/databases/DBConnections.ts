//const redis = require("redis");
import RedisClient from "@redis/client/dist/lib/client";
import { MongoClient } from "mongodb";
import { createClient, RedisClientType } from "redis";

const cluster = require("cluster");
import { ConfigFactory } from "../../factories/configFactory";
import { logger } from "../../logger/tslogger";

export class DBConnections {
  private static instance: DBConnections;
  private readonly mongoClient: Promise<MongoClient>;
  public redisClient: RedisClientType;
  private readonly config = ConfigFactory.getConfig();
  public static isConnected = false;

  /***
   *
   * @param isMaster true if current thread is master from cluster
   */
  constructor(isMaster?: boolean) {
    logger.info("Creating Mongo client", this.config.mongoDbUri);
    this.mongoClient = MongoClient.connect(
      encodeURI(this.config.mongoDbUri)
    ).then(async (res) => {
      logger.info("Mongo client connected!");
      DBConnections.isConnected = true;
      return res;
    });

    //hodit do samostatne tridy - oddelit mongo a redis
    this.redisClient = createClient({
      password: "1r7JzJUPefZhIiNy0Ty50SAV3uUK71mV",
      socket: {
        port: 11833,
        host: "redis-11833.c250.eu-central-1-1.ec2.cloud.redislabs.com",
      },
    });

    this.redisClient.connect();

    this.getRedisClient()

    this.redisClient.on("ready", async (mess) => {
      console.log("Message", mess);
    });

    this.redisClient.on("error", async (err) => {
      console.log("Error", err);
    });

    
  }

  public static getInstance() {
    if (!DBConnections.instance) {
      DBConnections.instance = new DBConnections(cluster.isMaster);
    }
    return DBConnections.instance;
  }

  public getMongoClient() {
    return this.mongoClient;
  }

  public async getRedisClient() {
    // this.redisClient.ping("message").then((mess) => {
    //   console.log(mess);
    // });

    await this.redisClient.connect;
  }
}
