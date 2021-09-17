const render_MW = require('../middlewares/render_MW');
const userFeedBack_MW = require('../middlewares/userFeedBack_MW');
const isValidRoute_MW = require('../middlewares/isValidRoute_MW');

const signUp_MW = require('../middlewares/auth/signUp_MW');
const signIn_MW = require('../middlewares/auth/signIn_MW');
const signOut_MW = require('../middlewares/auth/signOut_MW');
const auth_MW = require('../middlewares/auth/auth_MW');
const lostPW_MW = require('../middlewares/auth/lostPW_MW');
const redirectToFeed_MW = require('../middlewares/auth/redirectToFeed_MW');

const getUserByID_MW = require('../middlewares/user/getUserByID_MW');
const sendAvatar_MW = require('../middlewares/user/sendAvatar_MW');
const setUserAvatar_MW = require('../middlewares/user/setUserAvatar_MW');
const delUserAvatar_MW = require('../middlewares/user/delUserAvatar_MW');
const followUser_MW = require('../middlewares/user/followUser_MW');

const setGreet_MW = require('../middlewares/greet/setGreet_MW');
const getGreets_MW = require('../middlewares/greet/getGreets_MW');
const getGreetByID_MW = require('../middlewares/greet/getGreetByID_MW');
const getGreetsOfUser_MW = require('../middlewares/greet/getGreetsOfUser_MW');
const likeGreet_MW = require('../middlewares/greet/likeGreet_MW');

module.exports = function (
	app,
	{
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
	}
) {
	const objRep = {
		userModel,
		greetModel,
		commentModel,
		fileExts,
		saveToDB,
		genPassHash,
		checkPassHash,
		v4,
		join,
		unlinkSync,
	};

	app.post(
		'/sign-up', //regisztráció
		signUp_MW(objRep),
		render_MW('index')
	);

	app.post(
		'/sign-in', // bejelentkezés
		signIn_MW(objRep),
		render_MW('index')
	);

	app.get(
		'/sign-out', // kijelentkezés
		signOut_MW()
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

	// Feed

	app.get(
		'/feed/:whichfeed',
		isValidRoute_MW(),
		auth_MW(objRep),
		getUserByID_MW(objRep),
		getGreets_MW(objRep), // later getGreetsOfFollowed_MW
		//getComments_MW,
		userFeedBack_MW(),
		render_MW('feed', 'feed')
	);

	// Profiles

	app.get(
		'/profile/:uid',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		//getUserAvatar_MW(objRep),
		getGreetsOfUser_MW(objRep),

		//getComments_MW(objRep),

		userFeedBack_MW(),
		render_MW('profile/profile')
	);

	app.get(
		'/profile/avatar/:uid',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		sendAvatar_MW(objRep)
	);

	app.post(
		'/profile/set-avatar',
		auth_MW(objRep),
		uploadAvatar.single('avatar'),
		setUserAvatar_MW(objRep)
	);

	app.post(
		'/profile/del-avatar',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		delUserAvatar_MW(objRep)
	);

	app.get(
		'/profile/follow/:uid',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		followUser_MW(objRep)
	);

	// Greets
	app.post(
		'/greet/:gid',
		auth_MW(objRep),
		getGreetByID_MW(objRep),
		getUserByID_MW(objRep),
		setGreet_MW(objRep)
	);

	app.post(
		'/greet/like/:gid',
		auth_MW(objRep),
		getGreetByID_MW(objRep),
		likeGreet_MW(objRep)
	);

	app.get(
		'/',
		getUserByID_MW(objRep),
		redirectToFeed_MW(),
		getGreets_MW(objRep),
		userFeedBack_MW(),
		render_MW('index')
	);
};
