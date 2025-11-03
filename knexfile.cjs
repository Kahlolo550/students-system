require("dotenv").config();

module.exports = {
    development: {
        client: "mysql2",
        connection: process.env.MYSQL_URL || {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
        },
        migrations: {
            directory: "./migrations"
        }
    }
};