const express = require('express');
const session = require('express-session');
const multer = require('multer');
const fileExts = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
const avatarStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'profile/avatar');
	},
	filename: function (req, file, cb) {
		const ext = file.originalname
			.substring(file.originalname.lastIndexOf('.') + 1)
			.toLowerCase();
		cb(null, req.session.uid + '.' + ext);
	}
});
const uploadAvatar = multer({ storage: avatarStorage });
const port = process.env.PORT || 3000;
const { unlinkSync } = require('fs');
const { join } = require('path');
const { initDB } = require('./services/db');
const { v4 } = require('uuid');
const { genPassHash, checkPassHash } = require('./services/password');
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
		secret: '&No$s&nJ@cT7E_5g1zl$dMq5f&Dm_L!0kZ2&',
		resave: false,
		saveUninitialized: true,
	})
);
app.set('view engine', 'ejs');

initDB((err, { userModel, greetModel, commentModel, saveToDB }) => {
	if (err) {
		return console.log("Application can't start, beacuse: /n", err.message);
	}

	console.table(userModel.find());

	require('./router/index')(app, {
		userModel,
		greetModel,
		commentModel,
		fileExts,
		saveToDB,
		genPassHash,
		checkPassHash,
		uploadAvatar,
		v4,
		join,
		unlinkSync,
	});
	app.listen(port, '0.0.0.0', () => {
		console.log(`Server listening on port: ${port}`);
	});
});
