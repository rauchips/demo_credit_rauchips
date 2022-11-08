import knex from 'knex'
import dotenv from 'dotenv';

dotenv.config();

import configs from './knexfile'

const config = configs['development'];

const db = knex(config);

console.log('Database configuration loaded');

export default db;