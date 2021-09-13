const { router } = require('express');

const render_MW = require('../middlewares/render_MW');

const signUp_MW = require('../middlewares/auth/signUp_MW');
const singIn_MW = require('../middlewares/auth/signIn_MW');
const singOut_MW = require('../middlewares/auth/signOut_MW');
const auth_MW = require('../middlewares/auth/auth_MW');
const lostPW_MW = require('../middlewares/auth/lostPW_MW');

module.exports = function (app, { userModel, greetModel, commentModel }) {
	const objRep = {
		userModel,
		greetModel,
		commentModel,
	};

	app.use('/', express.static(join(__dirname, 'assets')));

	app.use(
		session({
			secret:
				'glk64a31sdfg654616w585484185vasdf15646sd5f4v5ad1fvb3a2df1bdfgdfg',
			resave: false,
			saveUninitialized: true,
		})
	);

	app.post(
		'sign-up', //regisztráció
		signUp_MW(objRep),
		render_MW('ejs')
	);

	app.post(
		'sign-in', // bejelentkezés
		singIn_MW(objRep),
		render_MW('ejs')
	);

	app.get(
		'sign-out', // kijelentkezés
		singOut_MW(),
		render_MW('ejs')
	);

	app.use(
		'lost-pw', // új jelszó kérés
		lostPW_MW(objRep),
		render_MW('ejs')
	);

	app.use(
		'new-pw/:uid/:secret', // jelszó módosítás
		getUserBySecret_MW,
		setUser_MW('password'),
		render_MW('ejs')
	);

};
