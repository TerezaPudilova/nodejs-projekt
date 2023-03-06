import { BaseController } from "./base.controller";
import * as express from "express";
import { RequestHandler } from "express";
import { logger } from "../logger/tslogger";
import { ConfigFactory } from "../factories/configFactory";
import { KeyService } from "../services/key.service";

export class KeysController implements BaseController {
  public router = express.Router();
  path = "/";

  private readonly config = ConfigFactory.getConfig();

  constructor(private keyService: KeyService) {
    this.initRouter();
  }

  initRouter() {
    this.router.get("/keys", this.keysHandler);
  }

  keysHandler: RequestHandler = async (req, res, next) => {
    const keys = await this.keyService.getKeys();
    logger.info("Toto je v keys", keys);
    res.redirect(this.config.landingPageUrl);
  };

  seconKeysHandler: RequestHandler = async (req, res, next) => {
    
  }


}
