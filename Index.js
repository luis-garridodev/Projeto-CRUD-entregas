const express = require('express');
const routes = require('./routes');
const csv = require('csv-parser');
const fs = require("fs");
const { type } = require("os");
const db = require('./db');




const app = express();
app.use(express.json());
app.use(routes);
fs.createReadStream("./dispatchExample.csv")
	.pipe(csv())
	.on("data", async function (row) {
const dispatch={
	type:row.TYPE,
	subtype:row.SUBTYPE,
	area:row.AREA,
	dispatchgroup:row.DISPATCH,
	user_id:2
	
}
		console.log(dispatch);
		
		await db('dispatch').insert(dispatch);
	})
	.on("error", error => {
		console.log("CSV invalid !", error);
	})
	.on("end", data => {
		console.log("End of parsing");
		console.log(data);
	});



app.listen(3333, () =>
	console.log('Servidor iniciado na porta 3333')
)
