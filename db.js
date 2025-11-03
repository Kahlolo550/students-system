import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST || "127.0.0.1",
    user: process.env.DB_USER || process.env.MYSQLUSER || "root",
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "",
    database: process.env.DB_NAME || process.env.MYSQL_DATABASE || "students",
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});