import { BaseController } from "./base.controller";
import * as express from "express";
import { RequestHandler } from "express";
import { ConfigFactory } from "../factories/configFactory";
import { KeyService } from "../services/key.service";
import { UserService } from "../services/user.service";
import { CustomRequest } from "../interfaces/CustomRequest";
import { BaseKey } from "../models/base-key.model";

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
    this.router.get("/keys", this.keysHandler);
    this.router.post("/create-key", this.createKeyHandler);
    this.router.delete("/delete-key", this.deleteKeyHandler);
    this.router.put("/update-key", this.updateKeyHandler);
  }

  keysHandler: RequestHandler = async (req: CustomRequest, res, next) => {
    let userKeysIds: string[] = [];
    let userKeys: BaseKey[] = [];

    const query = req.query;
    const user = await this.userService.findUser(req.email);

    if (user) {
      user.keys.forEach((key) => {
        userKeysIds.push(key);
      });
    }
    //TODO: toto by tam nemelo byt!
    // for (const keyId of userKeysIds) {
    //   const key = await this.keyService.getKey(keyId);
    //   userKeys.push(key);
    // }

    userKeys = await this.keyService.getKeys(userKeysIds)


    res.status(200).json({
      message: "Keys fetched successfully.",
      keys: userKeys,
    });
  };

  //res.status
  createKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const data = body.data;
    const email = body.email;
    await this.keyService.createKey(data, email);
    res.status(200).send();
  };
  //res.status
  deleteKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const data = body.data;
    const email = body.email;
    await this.keyService.deleteKey(data, email);
    res.status(200).send();
  };
  //res.status
  updateKeyHandler: RequestHandler = async (req, res, next) => {
    const body = req.body;
    const data = body.data;
    await this.keyService.updateKey(data);
    res.status(200).send();
  };
}
