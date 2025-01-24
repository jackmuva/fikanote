import { Request, Response } from "express";
var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
import pgPromise from 'pg-promise';
import 'dotenv/config';
import { uploadToS3 } from "./s3/uploadS3";

const pgp = pgPromise({/* Initialization Options */ });
let pgConf = {};
if (process.env.ENVIRON === "PROD") {
	pgConf = {
		user: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		ssl: {
			rejectUnauthorized: false,
		}
	}
} else if (process.env.ENVIRON === "DEV") {
	pgConf = {
		user: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
	}
}

const db = pgp(pgConf);
const port = 3000;
var corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
	res.send('FikaNote Backend Healthy!')
});

app.post('/api/generate-url/', (req: Request, res: Response) => {
	const body: { url: string, html: string } = req.body;
	const currentDate = new Date().toUTCString();
	const id = body.url.split("doc/")[1];
	console.log(body);
	db.one(`
			INSERT INTO GENERATED_URLS VALUES($1, $2, $3, $4) RETURNING *
		`, [id, body.url, body.html, currentDate]).then((returnedUrl) => {
		res.json({ message: "Successfully saved", url: returnedUrl.url });
	}).catch((e) => {
		res.json({ message: "Unable to generate URL", error: e.message });
	});
});

app.post('/api/save-image/', (req: Request, res: Response) => {
	const body: { imgId: string, docId: string, base64: string } = req.body;
	console.log(body);
	db.one(`INSERT INTO IMAGE_LOOKUP($1, $2) RETURNING *`,
		[body.imgId, body.docId]).then((returnedImg) => {
			uploadToS3(body.base64, body.imgId).then((message) => {
				res.json({ message: message.message, location: message.data, imgInfo: returnedImg });
			}).catch((e) => {
				res.json({ message: "Unable to upload to S3", error: e.message });
			});
		}).catch((e) => {
			res.json({ message: "Unable to generate URL for image", error: e.message });
		});
});

app.get('/api/get-url/:urlId', (req: Request, res: Response) => {
	const params = req.params;
	db.one(`SELECT * FROM GENERATED_URLS WHERE uuid=$1 LIMIT 1`, [params.urlId]).then((returnedUrl) => {
		res.json({ message: "retrieved content", html: returnedUrl.html });
	}).catch((e) => {
		res.json({ message: "Unable to retrieve URL", error: e.message });
	});
});



app.listen(port, () => {
	console.log(`FikaNote backend listening on port ${port}`)
})
