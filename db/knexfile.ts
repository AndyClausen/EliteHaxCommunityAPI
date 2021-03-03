import * as Knex from 'knex';

import loadConfig from '../config-loader';

loadConfig();

const typeCast = (field: any, next: any) => {
    if (field.type === 'TINY' && field.length === 1) {
        return field.string() === '1'; // 1 = true, 0 = false
    }
    if (field.type === 'JSON') {
        return JSON.parse(field.string());
    }
    return next();
};

const connection: Knex.MySqlConnectionConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    multipleStatements: true,
    typeCast,
    timezone: 'utc',
};

const config: Knex.Config = {
    client: 'mysql',
    connection,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: './migrations',
        tableName: 'migration',
    },
};

export default config;
