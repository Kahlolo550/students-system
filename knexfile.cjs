// knexfile.cjs
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST || "127.0.0.1",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "students",
            port: Number(process.env.DB_PORT) || 3306,
        },
        migrations: {
            directory: "./migrations",
        },
    },
    production: {
        client: "mysql2",
        connection: process.env.MYSQL_URL, // Railway MySQL URL
        migrations: {
            directory: "./migrations",
        },
    },
};