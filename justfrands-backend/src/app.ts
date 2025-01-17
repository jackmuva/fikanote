var express = require('express');
var cors = require('cors');
var app = express();
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

require('dotenv').config();
const port = 3000;
var corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200
}

const db = pgp(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);
//const res = await db.none('CREATE TABLE IF NOT EXISTS ');


app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('JustFrands Backend Healthy!')
});

app.post('/api/generate-url/', (req: any, res: any) => {
	const body = req.body;
	console.log(body);
	res.json({});
});



app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
