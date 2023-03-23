import { devNull } from "os";
import { BaseKey } from "../models/base-key.model";
import { DatabaseDataAccess } from "./database.dataAccess";

export class KeyDataAccess extends DatabaseDataAccess {
  private static instance: KeyDataAccess;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!KeyDataAccess.instance) {
      KeyDataAccess.instance = new KeyDataAccess();
    }
    return KeyDataAccess.instance;
  }

  public async getKeys(keyIds: string[], email: string): Promise<BaseKey[]> {
    let keysToReturn: BaseKey[] = [];
    let redisKeysToReturn: BaseKey[] = [];

    redisKeysToReturn = JSON.parse(
      await this.redisClient.get(`All userKeys cash:${email}`)
    );
    //console.log(redisKeysToReturn);
    if (redisKeysToReturn === null) {
      const keys = (await this.db
        .collection("keys")
        .find({ id: { $in: keyIds } })) as any as BaseKey[];

      await keys.forEach((key: BaseKey) => {
        keysToReturn.push(key);
      });
      this.redisClient.set(
        `All userKeys cash:${email}`,
        JSON.stringify(keysToReturn)
      );
      redisKeysToReturn = JSON.parse(
        await this.redisClient.get(`All userKeys cash:${email}`)
      );
    }

    return redisKeysToReturn;
  }

  public async createKey(key: BaseKey, email: string) {
    this.redisClient.del(`All userKeys cash:${email}`);
    this.redisClient.del(`User cash:${email}`);
    this.db.collection("keys").insertOne(key);
  }

  public async deleteKey(key: BaseKey, email: string) {
    this.redisClient.del(`All userKeys cash:${email}`);
    this.redisClient.del(`User cash:${email}`);
    this.db.collection("keys").deleteOne({ id: key.id });
  }

  public async updateKey(key: BaseKey, email: string) {
    this.redisClient.del(`All userKeys cash:${email}`);
    this.redisClient.del(`User cash:${email}`);
    this.db.collection("keys").updateOne({ id: key.id }, { $set: key });
  }
}
