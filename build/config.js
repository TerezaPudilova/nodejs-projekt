"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = function () {
    let node_env = process.env.NODE_ENV || 'localhost'; // 'prod' OR 'dev'
    if (node_env === 'production') {
        node_env = 'prod';
    }
    return configuration[node_env];
};
let configuration;
configuration = {
    prod: {
        mongoDbUri: 'mongodb+srv://DecisionUser248:advREX2kXa4JaBQD@decisioncluster.fcpws.mongodb.net/Decision?retryWrites=true&w=majority&readPreference=nearest',
        mongoDatabase: 'Decision',
        landingPageUrl: 'https://decisionrules.io/',
        version: '1.0.0'
    },
    localhost: {
        mongoDbUri: 'mongodb+srv://terypudilova:6R44gARoqv6QQWEs@cluster0.htakzqg.mongodb.net/messages?retryWrites=true&w=majority&readPreference=nearest',
        mongoDatabase: 'Decision',
        landingPageUrl: 'https://decisionrules.io/',
        dashboardPageUrl: 'https://localhost:4200/dashboard',
        version: '1.0.0'
    },
};
//# sourceMappingURL=config.js.map