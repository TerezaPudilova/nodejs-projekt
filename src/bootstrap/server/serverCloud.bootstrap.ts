import {ServerBaseBootstrap} from './serverBase.bootstrap';
import express from 'express';
import {logger} from '../../logger/tslogger';

const cluster = require('cluster');

/**
 * @extends {ServerBaseBootstrap}
 */
export class ServerCloudBootstrap extends ServerBaseBootstrap{

    constructor() {
        super();
    }

    public async start() {

        let app: express.Application;

        if (this.workers === 1) {
            logger.info(`Setting up 1 worker.`)
            app = this.initServer();
        } else if (cluster.isMaster) {
            logger.info(`Master cluster setting up ${this.workers} workers.`);
            for (let i = 0; i < this.workers; i++) {
                cluster.fork();
            }
            cluster.on('online', function (worker) {
                logger.info(`Worker ${worker.process.pid} is online`);
            });

            cluster.on('exit', function (worker, code, signal) {
                logger.info(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
                logger.info('Starting a new worker');
                cluster.fork();
            });
        } else {
            app = this.initServer();
        }

        return {
            app: app
        }

    }
}
