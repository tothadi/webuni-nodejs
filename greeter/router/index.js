const uuid = require('uuid');
const { genPassHash, checkPassHash } = require('../services/password');

const render_MW = require('../middlewares/render_MW');

const signUp_MW = require('../middlewares/auth/signUp_MW');
const singIn_MW = require('../middlewares/auth/signIn_MW');
const singOut_MW = require('../middlewares/auth/signOut_MW');
const auth_MW = require('../middlewares/auth/auth_MW');
const lostPW_MW = require('../middlewares/auth/lostPW_MW');

const setGreet_MW = require('../middlewares/greet/setGreet_MW');
const getGreets_MW = require('../middlewares/greet/getGreets_MW');
const getGreetByID_MW = require('../middlewares/greet/getGreetByID_MW');
const likeGreet_MW = require('../middlewares/greet/likeGreet_MW');
module.exports = function (
	app,
	{ userModel, greetModel, commentModel, saveToDB }
) {
	const objRep = {
		userModel,
		greetModel,
		commentModel,
		saveToDB,
		uuid,
		genPassHash,
		checkPassHash,
	};

	app.post(
		'/sign-up', //regisztráció
		signUp_MW(objRep),
		render_MW('index')
	);

	app.post(
		'/sign-in', // bejelentkezés
		singIn_MW(objRep),
		render_MW('index')
	);

	app.get(
		'/sign-out', // kijelentkezés
		singOut_MW(),
		render_MW('index')
	);

	app.use(
		'/lost-pw', // új jelszó kérés
		lostPW_MW(objRep),
		render_MW('ejs')
	);

	// app.use(
	// 	'/new-pw/:uid/:secret', // jelszó módosítás
	// 	getUserBySecret_MW,
	// 	setUser_MW('password'),
	// 	render_MW('ejs')
	// );

	app.get(
		'/feed/followed',
		auth_MW(objRep),
		//getUserByID_MW,
		getGreets_MW(objRep), // later getGreetsOfFollowed_MW
		//getComments_MW,
		render_MW('feed')
	);

	app.get(
		'/feed/public',
		auth_MW(objRep)
		//getUserByID_MW,
		//getGreets_MW,
		//getComments_MW,
		//render_MW
	);

	// Greets
	app.post(
		'/greet/:gid',
		auth_MW(objRep),
		//getGreetByID_MW,
		//getUserByID_MW,
		setGreet_MW(objRep)
		//render_MW('index')
	);

	app.get(
		'/greet/like/:gid',
		auth_MW(objRep),
		getGreetByID_MW(objRep),
		likeGreet_MW(objRep),
		//render_MW('index')
	);

	app.get('/', getGreets_MW(objRep), render_MW('index'));
};
