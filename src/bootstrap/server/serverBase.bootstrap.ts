// Base bootstrap class for server init.
// This class contains all shared operations with basic implementation for both subclasses.
// Do not use this class directly. Use it as parent class.
// Cloud version is used as base version, so little changes in cloud subclass.
import {IServerInstances} from "../../interfaces/IServerInstances";
import {AuditServer} from "../../server/audit.server";
import express from 'express';
import {DefaultController} from "../../controllers/default.controller";

export class ServerBaseBootstrap {

    protected workers: number;
    protected server: AuditServer;

    constructor() {
        this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1;
    }

    /**
     * Function that serves as a template for server init.
     * @protected
     *
     * @returns {Promise<IServerInstances>} Return value is promise due to async character of the method.
     */
    protected async start():Promise<IServerInstances>{return;}

    /**
     * Base method for server init derivative from old cloud settings.
     * @protected
     *
     * @returns {express.Application}
     */
    protected initServer(): express.Application {
        const port = process.env.PORT || 8080;

        this.server = new AuditServer(Number.parseInt(port.toString()), [
                new DefaultController()
            ]
        );

        this.server.listen();
        return this.server.app;
    }
}
