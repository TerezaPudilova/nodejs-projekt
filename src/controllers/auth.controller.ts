import { BaseController } from "./base.controller";
import * as express from "express";
import { RequestHandler } from "express";
import { ConfigFactory } from "../factories/configFactory";
import { UserService } from "../services/user.service";
import { logger } from "../logger/tslogger";
import { v4 as uuidv4 } from "uuid";
import { emit } from "process";
import { CustomRequest } from "../interfaces/CustomRequest";
import { BaseKey } from "../models/base-key.model";
import { KeyService } from "../services/key.service";

const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middlewares/auth");
export class AuthController implements BaseController {
  public router = express.Router();
  path = "/";

  private readonly config = ConfigFactory.getConfig();

  constructor(
    private userService: UserService,
    private keyService: KeyService
  ) {
    this.initRouter();
  }

  initRouter() {
    this.router.post("/signup", this.signupHandler);
    this.router.post("/login", this.loginHandler);
    this.router.get("/user", AuthMiddleware, this.findUserHandler);
    this.router.put("/create-user-key", this.createUserKeyHandler);
    this.router.put("/delete-user-key", this.deleteUserKeyHandler);
  }

  signupHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const id = body.id;
    const email = body.email;
    const keys: [] = [];
    const password = body.password;
    // logger.info(body);
    const user = await this.userService.signup(id, email, keys, password);
    res.status(200).json({
      message: "User created successfully",
      user: {
        id: id,
        email: email,
        keys: keys,
        password: password,
      },
    });
    //TODO: dodelat handlovani erroru
  };

  loginHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    const loadedUser = await this.userService.login(email, password);
    
    // logger.info(body);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        email: email,
        keys: loadedUser.keys,
      },
    });
  };

  createUserKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const key = body.key;
    // logger.info(key);
    // logger.info(email);
    await this.userService.setUserKey(email, key);
    res.status(200).json({
      message: "User key created successfully",
      user: {
        email: email,
        key: key,
      },
    });
  };

  deleteUserKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const key = body.key;
    // logger.info(key);
    // logger.info(email);
    await this.userService.deleteUserKey(email, key);
    res.status(200).json({
      message: "User key deleted successfully",
      user: {
        email: email,
        key: key,
      },
    });
  };

  findUserHandler: RequestHandler = async (req: CustomRequest, res, next) => {
    const loadedUser = await this.userService.findUser(req.email);

    res.status(200).json({
      message: "User updated successfully",
      user: {
        email: req.email,
        keys: loadedUser.keys,
      },
    });
  };
}
