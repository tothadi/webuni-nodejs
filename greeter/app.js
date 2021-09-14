const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 3000;
const { join } = require('path');
const { initDB } = require('./services/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))
app.use('/', express.static(join(__dirname, 'assets')));
app.use(
	session({
		secret:
			'&No$s&nJ@cT7E_5g1zl$dMq5f&Dm_L!0kZ2&',
		resave: false,
		saveUninitialized: true,
	})
);
app.set('view engine', 'ejs');


initDB((err, { userModel, greetModel, commentModel, saveToDB }) => {
	if (err) {
		return console.log("Application can't start, beacuse: /n", err.message);
	}

	console.table(greetModel.find())

    require('./router/index')(app, { userModel, greetModel, commentModel, saveToDB });
	app.listen(port, '0.0.0.0', () => {
		console.log(`Server listening on port: ${port}`);
	});
});
