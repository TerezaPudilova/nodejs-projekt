"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerCloudBootstrap = void 0;
const serverBase_bootstrap_1 = require("./serverBase.bootstrap");
const tslogger_1 = require("../../logger/tslogger");
const cluster = require('cluster');
/**
 * @extends {ServerBaseBootstrap}
 */
class ServerCloudBootstrap extends serverBase_bootstrap_1.ServerBaseBootstrap {
    constructor() {
        super();
    }
    async start() {
        let app;
        if (this.workers === 1) {
            tslogger_1.logger.info(`Setting up 1 worker.`);
            app = this.initServer();
        }
        else if (cluster.isMaster) {
            tslogger_1.logger.info(`Master cluster setting up ${this.workers} workers.`);
            for (let i = 0; i < this.workers; i++) {
                cluster.fork();
            }
            cluster.on('online', function (worker) {
                tslogger_1.logger.info(`Worker ${worker.process.pid} is online`);
            });
            cluster.on('exit', function (worker, code, signal) {
                tslogger_1.logger.info(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
                tslogger_1.logger.info('Starting a new worker');
                cluster.fork();
            });
        }
        else {
            app = this.initServer();
        }
        return {
            app: app
        };
    }
}
exports.ServerCloudBootstrap = ServerCloudBootstrap;
//# sourceMappingURL=serverCloud.bootstrap.js.map