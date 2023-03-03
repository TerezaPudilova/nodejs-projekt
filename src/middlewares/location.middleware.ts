import express from "express";

export function locationMiddleware(request: express.Request, response: express.Response, next) {
   response.set('X-Location', process.env.LOCATION);
   next();
}
