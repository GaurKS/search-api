module.exports = {
    HOST: 'localhost',
    USER: 'me',
    PASSWORD: 'password',
    DB: 'api',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
};