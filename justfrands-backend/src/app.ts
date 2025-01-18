import { Request, Response } from "express";
var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({/* Initialization Options */ });
const db = pgp(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);
const port = 3000;
var corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('JustFrands Backend Healthy!')
});

app.post('/api/generate-url/', (req: Request, res: Response) => {
	const body: { url: string, html: string } = req.body;
	const currentDate = new Date().toUTCString();
	const id = body.url.split("doc/")[1];
	db.one(`
			INSERT INTO GENERATED_URLS VALUES($1, $2, $3, $4) RETURNING *
		`, [id, body.url, body.html, currentDate]).then((returnedUrl) => {
		res.json({ message: "Successfully saved", url: returnedUrl.url });
	}).catch((e) => {
		res.json({ message: "Unable to generate URL", error: e.message });
	});
});

app.get('/api/get-url/:urlId', (req: Request, res: Response) => {
	const params = req.params;
	db.one(`SELECT * FROM GENERATED_URLS WHERE uuid=$1 LIMIT 1`, [params.urlId]).then((returnedUrl) => {
		console.log(returnedUrl);
		res.json({ message: "retrieved content", html: returnedUrl.html });
	}).catch((e) => {
		res.json({ message: "Unable to retrieve URL", error: e.message });
	});
});



app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
