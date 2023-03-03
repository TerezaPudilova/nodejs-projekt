"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationMiddleware = void 0;
function locationMiddleware(request, response, next) {
    response.set('X-Location', process.env.LOCATION);
    next();
}
exports.locationMiddleware = locationMiddleware;
//# sourceMappingURL=location.middleware.js.map