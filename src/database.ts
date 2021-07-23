import pg from "pg";

const { Pool } = pg;

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const connection = new Pool(config);

export default connection;