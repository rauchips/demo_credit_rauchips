import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

import { HOST, PASSWORD, DB } from '../utils'

const configs: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: HOST,
      port: 3306,
      user: DB,
      password: PASSWORD,
      database: DB
    },
    debug: true,
    useNullAsDefault: true
  },
};

export default configs;
