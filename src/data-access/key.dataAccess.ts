import { BaseKey } from "../models/base-key.model";
import { ApiKey, LicenceKey } from "../models/key.model";
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

  public async getKey(keyId: string): Promise<BaseKey> {
    const key = this.db
      .collection("keys")
      .findOne({ id: keyId }) as any as BaseKey;
    return key;
  }

  public async createKey(key: BaseKey) {
    this.db.collection("keys").insertOne(key);
  }

  public async deleteKey(key: BaseKey) {
    this.db.collection("keys").deleteOne({ id: key.id });
  }

  public async updateKey(key: BaseKey) {
    this.db.collection("keys").updateOne({ id: key.id }, { $set: key });
  }
}
