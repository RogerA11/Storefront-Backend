import dotenv from 'dotenv'
import { Client, Pool, PoolClient } from 'pg' 

dotenv.config()

const { 
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD, 
  POSTGRES_TEST_DB, 
  ENV } = process.env

let client: Pool 
console.log(`running ${ENV} environment` ) 

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  throw new Error('Invalid environment');
}

export default client;