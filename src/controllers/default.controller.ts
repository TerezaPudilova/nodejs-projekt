import {BaseController} from "./base.controller";
import * as express from "express";
import {RequestHandler} from "express";
import {ConfigFactory} from "../factories/configFactory";
import {DBConnections} from "../services/databases/DBConnections";

export class DefaultController implements BaseController {
    public router = express.Router();
    path = '/';

    private readonly config = ConfigFactory.getConfig();


    constructor() {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', this.indexHandler);
        this.router.get('/health-check', this.getHealthCheck);
    }

    indexHandler: RequestHandler = async (req, res) => {
        res.redirect(this.config.dashboardPageUrl);
    };

    getHealthCheck: RequestHandler = async (req, res) => {
        if (DBConnections.isConnected === false) {
            res.status(500).send('Database is not connected');
            return;
        }
        res.status(200).send('Audit server is running on version: '+ this.config.version);
    };
}
