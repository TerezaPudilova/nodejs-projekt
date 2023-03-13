import { User } from "../models/user";
import { DatabaseDataAccess } from "./database.dataAccess";

export class UserDataAccess extends DatabaseDataAccess {
  private static instance: UserDataAccess;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!UserDataAccess.instance) {
      UserDataAccess.instance = new UserDataAccess();
    }
    return UserDataAccess.instance;
  }

  //obecnejsi nazev - createUser - na vstupu prijde model usera
  public async createUser(newUser: User) {
    this.db.collection("users").insertOne(newUser);
  }

  public async findUser(email: string): Promise<User> {
    const user: User = (await this.db
      .collection<User>("users")
      .findOne({ email: email })) as any as User;
    return user;
  }

  public async createUserKey(email: string, key: string) {
    this.db
      .collection("users")
      .updateOne({ email: email }, { $addToSet: { keys: key } });
  }

  public async deleteUserKey(email: string, key: string) {
    this.db.collection("users")
    .updateOne({email: email}, {$pull: {keys: key}})
  }


}
