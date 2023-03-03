"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverMiddleware = void 0;
function serverMiddleware(request, response, next) {
    response.set('Server', 'Decisionrules.io');
    next();
}
exports.serverMiddleware = serverMiddleware;
//# sourceMappingURL=server.middleware.js.map