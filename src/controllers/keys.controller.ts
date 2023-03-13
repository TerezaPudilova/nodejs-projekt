import { BaseController } from "./base.controller";
import * as express from "express";
import { RequestHandler } from "express";
import { logger } from "../logger/tslogger";
import { ConfigFactory } from "../factories/configFactory";
import { KeyService } from "../services/key.service";
import { UserService } from "../services/user.service";
import { CustomRequest } from "../interfaces/CustomRequest";
import { BaseKey } from "../models/base-key.model";

const AuthMiddleware = require("../middlewares/auth");

export class KeysController implements BaseController {
  public router = express.Router();
  path = "/";

  private readonly config = ConfigFactory.getConfig();

  constructor(
    private keyService: KeyService,
    private userService: UserService
  ) {
    this.initRouter();
  }

  initRouter() {
    this.router.get("/keys", AuthMiddleware, this.keysHandler);
    this.router.post("/key", AuthMiddleware, this.createKeyHandler);
    this.router.delete("/delete-key", AuthMiddleware, this.deleteKeyHandler);
    this.router.put("/update-key", AuthMiddleware, this.updateKeyHandler);
  }

  keysHandler: RequestHandler = async (req: CustomRequest, res, next) => {
    let userKeysIds: string[] = [];
    let userKeys: BaseKey[] = [];

    const query = req.query;
    const keyId = query.keyId;
 
    const user = await this.userService.findUser(req.email);
   

    if (user) {
      user.keys.forEach((key) => {
        userKeysIds.push(key);
      });
    }
    for (const keyId of userKeysIds) {
      const key = await this.keyService.getKey(keyId)
      userKeys.push(key)
    }
   // console.log(userKeys)
    res.status(200).json({
      message: "Keys fetched successfully.",
      keys: userKeys
    })
  };

  createKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const data = body.data;
    await this.keyService.createKey(data);
  };

  deleteKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const data = body.data;
    //console.log(body)
    await this.keyService.deleteKey(data);
    res.status(200).json({
      message: "Key deleted successfully",
      key: data
    })
  }

  updateKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const data = body.data;
    await this.keyService.updateKey(data)
    res.status(200).json({
      message: "Key updated successfully",
      key: data
    })
  }
}
