import type { Knex } from "knex";
import dotenv from 'dotenv';
dotenv.config();

const configs: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'sql7.freesqldatabase.com',
      port: 3306,
      user: 'sql7545003',
      password: 'r9IpuxXtCS',
      database: 'sql7545003'
    },
    debug: true,
    useNullAsDefault: true
  },
};

export default configs;
