// redis: {
//     host: env.REDIS_HOST || 'redis-15322.c16.us-east-1-2.ec2.cloud.redislabs.com',
//     port: env.REDIS_PORT || 15322,
//     password: env.REDIS_PASSWORD
// }


// Enter your Redis Cloud credentials to proceed, for more info https://redis.com/deployment/method/
module.exports = {
    HOST: 'redis-15322.c16.us-east-1-2.ec2.cloud.redislabs.com',
    PORT: 15322,
    PASSWORD: env.REDIS_PASSWORD   
};