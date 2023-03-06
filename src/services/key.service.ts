import { Db, MongoClient } from "mongodb";
import { KeyDataAccess } from "../data-access/key.dataAccess";
import { logger } from "../logger/tslogger";

export class KeyService {

  keyDataAccess: KeyDataAccess;

  constructor() {
    this.keyDataAccess = KeyDataAccess.getInstance();
  }


  public async getKeys(): Promise<string> {
    const keys = await this.keyDataAccess.getKeysByUserId();
    return keys
  }
}
