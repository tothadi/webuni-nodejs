const express = require('express');
const session = require('express-session');
const { join } = require('path');
const { v4 } = require('uuid');
const { initDB } = require('./services/db');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use('/', express.static(join(__dirname, 'assets')));
app.use(
	session({
		secret: v4(),
		resave: false,
		saveUninitialized: true,
	})
);
app.set('view engine', 'ejs');

initDB((err, { userModel, greetModel, commentModel, saveToDB }) => {
	if (err) {
		return console.log("Application can't start, beacuse: /n", err.message);
	}

	require('./router/index')(app, {
		userModel,
		greetModel,
		commentModel,
		saveToDB,
		join,
		v4
	});
	app.listen(port, '0.0.0.0', () => {
		console.log(`Server listening on port: ${port}`);
	});
});
