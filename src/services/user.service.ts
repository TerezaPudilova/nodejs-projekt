import { UserDataAccess } from "../data-access/user.dataAccess";
import { UserServiceInterface } from "../interfaces/UserService";
//const { validationResult } = require("express-validator/check");
//import { bcrypt } from "../../node_modules/bcrypt";
const bcrypt = require("bcrypt");
import { User } from "../models/user";

export class UserService implements UserServiceInterface {
  userDataAccess: UserDataAccess;

  constructor() {
    this.userDataAccess = UserDataAccess.getInstance();
  }

  public async signup(
    id: string,
    email: string,
    password: string
  ) {
    const keys: [] = [];
    const newUser = new User(id, email, keys, password);
    await this.userDataAccess.createUser(newUser);
  }

  public async login(email: string, password: string): Promise<User> {
    const loadedUser = await this.userDataAccess.findUser(email);
    return loadedUser;
  }

  public async findUser(email: string): Promise<User> {
    const user = await this.userDataAccess.findUser(email);
    return user;
  }
}
