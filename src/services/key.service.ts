import { Db, MongoClient } from "mongodb";
import { KeyDataAccess } from "../data-access/key.dataAccess";
import { logger } from "../logger/tslogger";
import { BaseKey } from "../models/base-key.model";
import { LicenceKey } from "../models/key.model";

export class KeyService {

  keyDataAccess: KeyDataAccess;

  constructor() {
    this.keyDataAccess = KeyDataAccess.getInstance();
  }


  public async getKey(keyId: string): Promise<BaseKey> {
    const keys = await this.keyDataAccess.getKey(keyId);
    return keys
  }

  public async createKey(key: BaseKey) {
    await this.keyDataAccess.createKey(key)
  }

  public async deleteKey(key: BaseKey) {
    await this.keyDataAccess.deleteKey(key)
  }

  public async updateKey(key: BaseKey) {
    await this.keyDataAccess.updateKey(key)
  }
}
