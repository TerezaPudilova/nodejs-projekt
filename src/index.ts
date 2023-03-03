import {decisionRules} from "./assets/icons/headline";
import {IServerInstances} from "./interfaces/IServerInstances";
import {ServerCloudBootstrap} from "./bootstrap/server/serverCloud.bootstrap";
import {ServerFactory} from "./factories/server.factory";
import {logger} from './logger/tslogger';
import express from 'express';

export var app: express.Application;

console.log(decisionRules);

/**
 * Server constant that hold server instance.
 * @type {ServerCloudBootstrap}
 */
const server: ServerCloudBootstrap = ServerFactory.getServerInstance();

const DRAudit = async ()=> {
    try {
        const result: IServerInstances = await server.start();
        app = result.app;
    } catch (e) {
        logger.warn("Test vars not set");
        return;
    }
}

DRAudit().then();