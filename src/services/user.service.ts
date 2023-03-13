import { UserDataAccess } from "../data-access/user.dataAccess";
//const { validationResult } = require("express-validator/check");
import { validationResult } from "../../node_modules/express";
//import { bcrypt } from "../../node_modules/bcrypt";
const bcrypt = require("bcrypt");
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/tslogger";

export class UserService {
  userDataAccess: UserDataAccess;

  constructor() {
    this.userDataAccess = UserDataAccess.getInstance();
  }

  //navratova hodnota Promise<user>
  public async signup(
    id: string,
    email: string,
    keys: string[],
    password: string
  ) {
    const newUser = new User(id, email, keys, password);
    await this.userDataAccess.createUser(newUser);

    // const user = await this.userDataAccess.signup()
    // return user
  }

  //TODO: odstranit then
  public async login(email: string, password: string): Promise<User> {
    let loadedUser: User;
    await this.userDataAccess.findUser(email).then((user: User) => {
      loadedUser = user;
    });
    //logger.info(loadedUser);
    return loadedUser;
  }

  public async setUserKey(email: string, key: string) {
    await this.userDataAccess.createUserKey(email, key);
  }

  public async deleteUserKey(email: string, key: string) {
    await this.userDataAccess.deleteUserKey(email, key)
  }


  public async findUser(email: string): Promise<User> {
   const user = await this.userDataAccess.findUser(email);
   return user
  }
}
