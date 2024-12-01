import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config( { path: '.env' } );

// Initialize the postgres client with connection pooling options
const client = postgres( process.env.DATABASE_URL!, {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 300, // How long a client is allowed to remain idle before being closed (in seconds)
  connect_timeout: 30, // How long to wait before timing out when connecting a new client (in seconds)
} );

export const db = drizzle( client );
