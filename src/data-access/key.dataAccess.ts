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

  // public async getKeys(keyIds: string[]): Promise<BaseKey[]> {
  //   let redisKeysToReturn: BaseKey[] = [];
  //   let keysToReturn: BaseKey[] = [];
  //   let redisKey


  //   keyIds.forEach(async (keyId)=> 
  //   {
  //    redisKey = this.redisClient.get(keyId)
  //    console.log(redisKey)

  //    if (redisKey === null) {
  //     const key = (await this.db
  //       .collection("keys")
  //       .findOne({ id: keyId })) as any as BaseKey; 
  //    }
  //   }

  //   )

  //   const keys = (await this.db
  //     .collection("keys")
  //     .find({ id: { $in: keyIds } })) as any as BaseKey[];

  //   await keys.forEach((key: BaseKey) => {
  //     keysToReturn.push(key);
  //   });

  //   console.log("Toto pole je v keysToReturn", keysToReturn);

  //   return keysToReturn
  // }

  // public async getKey(keyId: string): Promise<BaseKey> {
  //   let redisKey;
  //   redisKey = await this.redisClient.get(keyId);
  //   // console.log(redisKey);
  //   if (redisKey === null) {
  //     const key = (await this.db
  //       .collection("keys")
  //       .findOne({ id: keyId })) as any as BaseKey;
  //     //  console.log("Tento key prijde z mongodb", key);
  //     const redisKeyCreated = await this.redisClient.set(
  //       keyId,
  //       JSON.stringify(key)
  //     );
  //     //  console.log("Key z mongodb se ulozil do redisu:", redisKeyCreated)
  //     redisKey = await this.redisClient.get(keyId);
  //     return JSON.parse(redisKey);
  //   }
  //   return JSON.parse(redisKey);
  // }

//userId
    public async getKeys(keyIds: string[]): Promise<BaseKey[]> {
    let keysToReturn: BaseKey[] = [];

    const keys = (await this.db
      .collection("keys")
      .find({ id: { $in: keyIds } })) as any as BaseKey[];

    await keys.forEach((key: BaseKey) => {
      keysToReturn.push(key);
    });

    console.log("Toto pole je v keysToReturn", keysToReturn);

    return keysToReturn
  }



//smazat z redisu
  public async createKey(key: BaseKey) {
    this.db.collection("keys").insertOne(key);
  }

  public async deleteKey(key: BaseKey) {
    this.redisClient.del(key.id);
    this.db.collection("keys").deleteOne({ id: key.id });
  }

  public async updateKey(key: BaseKey) {
    this.redisClient.del(key.id);
    this.db.collection("keys").updateOne({ id: key.id }, { $set: key });
  }
}
