import { User } from "../models/user";

export interface UserServiceInterface {
  signup(id: string, email: string, password: string);
  login(email: string, password: string);
  findUser(email: string): Promise<User>
}
