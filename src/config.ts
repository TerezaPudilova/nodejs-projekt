export let config;

config = function () {
    let node_env = process.env.NODE_ENV || 'localhost'; // 'prod' OR 'dev'
    if (node_env === 'production') {
        node_env = 'prod';
    }

    return configuration[node_env];
}

let configuration;
configuration = {
    prod: {
        mongoDbUri: 'mongodb+srv://DecisionUser248:advREX2kXa4JaBQD@decisioncluster.fcpws.mongodb.net/Decision?retryWrites=true&w=majority&readPreference=nearest',
        mongoDatabase: 'Decision',
        redisPassword: '1r7JzJUPefZhIiNy0Ty50SAV3uUK71mV',
        redisPort: 11833,
        redisHost: 'redis-11833.c250.eu-central-1-1.ec2.cloud.redislabs.com',

        landingPageUrl: 'https://decisionrules.io/',
        version: '1.0.0'
    },
    localhost: {
        mongoDbUri: 'mongodb+srv://terypudilova:6R44gARoqv6QQWEs@cluster0.htakzqg.mongodb.net/messages?retryWrites=true&w=majority&readPreference=nearest',
        mongoDatabase: 'Decision',
        redisPassword: '1r7JzJUPefZhIiNy0Ty50SAV3uUK71mV',
        redisPort: 11833,
        redisHost: 'redis-11833.c250.eu-central-1-1.ec2.cloud.redislabs.com',

        landingPageUrl: 'https://decisionrules.io/',
        dashboardPageUrl: 'https://localhost:4200/dashboard',
        version: '1.0.0'
    },
}
