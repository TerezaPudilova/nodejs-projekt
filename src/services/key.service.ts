import { KeyDataAccess } from "../data-access/key.dataAccess";
import { BaseKey } from "../models/base-key.model";
import { v4 as uuidv4 } from "uuid";
import { UserDataAccess } from "../data-access/user.dataAccess";

export class KeyService {

  keyDataAccess: KeyDataAccess;
  userDataAccess: UserDataAccess;

  constructor() {
    this.keyDataAccess = KeyDataAccess.getInstance();
    this.userDataAccess = UserDataAccess.getInstance();
  }

  public async getKeys(keyIds: string[], email: string): Promise<BaseKey[]> {
    const keys = await this.keyDataAccess.getKeys(keyIds, email)
    return keys
  }

  // public async getKey(keyId: string): Promise<BaseKey> {
  //   const keys = await this.keyDataAccess.getKey(keyId);
  //   return keys
  // }

  public async createKey(key: BaseKey, email: string) {
    const uuid = uuidv4();
    const hash = uuidv4();
    key.id = uuid;
    key.hash = hash;

    await this.userDataAccess.createUserKey(email, key.id)
    await this.keyDataAccess.createKey(key, email)
  }

  public async deleteKey(key: BaseKey, email: string) {
    await this.userDataAccess.deleteUserKey(email, key.id)
    await this.keyDataAccess.deleteKey(key, email)
  }

  public async updateKey(key: BaseKey, email: string) {
    await this.keyDataAccess.updateKey(key, email)
  }
}
