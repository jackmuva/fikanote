import pg from 'pg';
const { Client } = pg;
import 'dotenv/config';

const pgClient = new Client({
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	ssl: {
		rejectUnauthorized: false,
	}
});

await pgClient.connect();

await pgClient.query(`
	CREATE TABLE IF NOT EXISTS GENERATED_URLS (
		uuid VARCHAR(255) PRIMARY KEY,
		url VARCHAR(255),
		html TEXT,
		datetime VARCHAR(255)
	)`);

await pgClient.end();
