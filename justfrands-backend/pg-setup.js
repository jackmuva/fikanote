import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({/* Initialization Options */ });
const db = pgp(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);

const res = await db.none(`
	CREATE TABLE IF NOT EXISTS GENERATED_URLS (
		uuid VARCHAR(255) PRIMARY KEY,
		url VARCHAR(255),
		html TEXT,
		datetime VARCHAR(255)
	)`);
