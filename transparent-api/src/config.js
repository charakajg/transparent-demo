const db_config = {
    host: "localhost",
    port: "27017",
    database: "transparent"
};

const config = {
    SERVER_PORT: 5000,
    GRAPHQL_ENDPOINT: "/graphql",
    MONGODB_STRING: `mongodb://${db_config.host}:${db_config.port}/${db_config.database}`,
    JWT_SECRET: "345dsdfgs44vvafd",
    JWT_ALGO: "HS256",
    BCRYPT_HASH_ROUNDS: 10,
    EXPIRE_TIME_AFTER_REGISTRATION: "3m",
    EXPIRE_TIME_AFTER_LOGIN: "1d"
};

module.exports = config;