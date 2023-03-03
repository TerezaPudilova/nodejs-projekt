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
        mongoDbUri: 'mongodb+srv://dbUser2:QQmrYPk7TTVR6ERK@decisiongrid-staging.o51cp.mongodb.net/Decision?retryWrites=true&w=majority&readPreference=nearest',
        mongoDatabase: 'Decision',
        landingPageUrl: 'https://decisionrules.io/',
        version: '1.0.0'
    },
};
//# sourceMappingURL=config.js.map