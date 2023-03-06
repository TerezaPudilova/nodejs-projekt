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

  public async getKeysByUserId(): Promise<string> {
    //TODO - logika na ziskavani klicu
    return 'keys'
  }
}
