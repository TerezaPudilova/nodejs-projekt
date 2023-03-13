import express from "express";
import cors from "cors";
import { BaseController } from "../controllers/base.controller";
import { errorHandlerMiddleware } from "../middlewares/errorHandler.middleware";
import { logger } from "../logger/tslogger";

import { locationMiddleware } from "../middlewares/location.middleware";
import { serverMiddleware } from "../middlewares/server.middleware";
import process from "process";

const bodyParser = require("body-parser");
const helmet = require("helmet");
const enforce = require("express-sslify");

export class AuditServer {
  public app: express.Application;
  public port: number;

  constructor(port, controllers: BaseController[]) {
    this.app = express();
    this.app.use(helmet());
    this.app.use(serverMiddleware);
    this.app.use(locationMiddleware);

    if (process.env.FORCE_HTTPS && process.env.FORCE_HTTPS === "true") {
      this.app.use(enforce.HTTPS({ trustProtoHeader: true }));
    }

    this.port = port;

    this.app.use(bodyParser.json({ limit: "100mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "100mb",
        extended: true,
        parameterLimit: 50000,
      })
    );

    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    });

    this.app.use(express.json());
    this.app.use(cors());

    this.initControllers(controllers);
    this.app.use(errorHandlerMiddleware);

    this.showLocation();
  }

  showLocation() {
    const location = process.env.LOCATION;
    if (location) {
      logger.info("Location: ", location);
    }
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(
        `DecisionRules audit server listening on the port ${this.port}`
      );
    });
  }

  private initControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }
}
