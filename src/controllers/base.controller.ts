import express from 'express';

export interface BaseController {
    path: string;
    router: express.Router;
    initRouter(): void;
}
