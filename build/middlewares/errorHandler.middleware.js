"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const HttpException_1 = require("../exceptions/HttpException");
const tslogger_1 = require("../logger/tslogger");
function errorHandlerMiddleware(error, request, response, next) {
    const message = error.message || 'Something went wrong';
    if (error instanceof HttpException_1.HttpException) {
        const status = error === null || error === void 0 ? void 0 : error.status;
        let payload = {
            error: {
                message: message
            }
        };
        if (status !== 401) {
            tslogger_1.logger.warn(error);
        }
        response.status(status).json(payload).send();
    }
    else {
        let payload = {
            error: {
                message: message
            }
        };
        tslogger_1.logger.warn(error);
        response.status(500).json(payload).send();
    }
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.middleware.js.map