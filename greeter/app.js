const express = require('express');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;
const { join } = require('path');
const { initDB } = require('../services/db');

app.set('view engine', 'ejs');

initDB((err, { userModel, greetModel, commentModel }) => {
	if (err) {
		return console.log("Application can't start, beacuse: /n", err.message);
	}

    require('./router/index')(app, { userModel, greetModel, commentModel });
	app.listen(port, '0.0.0.0', () => {
		console.log(`Server listening on port: ${port}`);
	});
});
