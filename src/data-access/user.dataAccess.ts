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

  public async createUser(newUser: User) {
    this.db.collection("users").insertOne(newUser);
  }


  public async findUser(email: string): Promise<User> {
    let redisUser;
    let userSetToRedis;
    redisUser = JSON.parse(await this.redisClient.get(`User cash:${email}`));
    //console.log("Tento uzivatel nacten z redisu", redisUser)
    if (redisUser === null) {
      //console.log("Uzivatel neni v redisu - je potreba vytahnout z db")
      const user: User = (await this.db
        .collection<User>("users")
        .findOne({ email: email })) as any as User;
       //console.log("Tonto user dotazen z mongodb", user) 
      userSetToRedis = await this.redisClient.set(`User cash:${email}`, JSON.stringify(user));
      //console.log("Uzivatel uspesne zapsan do redisu", userSetToRedis)
      redisUser = JSON.parse(await this.redisClient.get(`User cash:${email}`))
      return redisUser
    }
    return redisUser;
  }

  public async createUserKey(email: string, key: string) {
    this.db
      .collection("users")
      .updateOne({ email: email }, { $addToSet: { keys: key } });
  }

  public async deleteUserKey(email: string, key: string) {
    this.db
      .collection("users")
      .updateOne({ email: email }, { $pull: { keys: key } });
  }
}
