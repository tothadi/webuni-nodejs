const { readdirSync, unlinkSync } = require('fs');
const { genPassHash, checkPassHash } = require('../services/password');
const multer = require('multer');

const render_MW = require('../middlewares/render_MW');
const userFeedBack_MW = require('../middlewares/userFeedBack_MW');
const isValidRoute_MW = require('../middlewares/isValidRoute_MW');

const avatarStorage_MW = require('../middlewares/multer/avatarStorage_MW');
const greetStorage_MW = require('../middlewares/multer/greetStorage_MW');
const fileFilter_MW = require('../middlewares/multer/fileFilter_MW');

const signUp_MW = require('../middlewares/auth/signUp_MW');
const signIn_MW = require('../middlewares/auth/signIn_MW');
const signOut_MW = require('../middlewares/auth/signOut_MW');
const auth_MW = require('../middlewares/auth/auth_MW');
const lostPW_MW = require('../middlewares/auth/lostPW_MW');
const redirectToFeed_MW = require('../middlewares/auth/redirectToFeed_MW');

const getUsers_MW = require('../middlewares/user/getUsers_MW');
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
const delGreet_MW = require('../middlewares/greet/delGreet_MW');
const setGreetPics = require('../middlewares/greet/setGreetPics');
const sendGreetPic_MW = require('../middlewares/greet/sendGreetPic_MW');
const delGreetPics_MW = require('../middlewares/greet/delGreetPics_MW');

module.exports = function (
	app,
	{
		userModel,
		greetModel,
		commentModel,
		saveToDB,
		join,
		v4
	}
) {
	const objRep = {
		userModel,
		greetModel,
		commentModel,
		saveToDB,
		genPassHash,
		checkPassHash,
		v4,
		join,
		readdirSync,
		unlinkSync,
	};


	const avatarStorage = multer.diskStorage({
		destination: avatarStorage_MW.destination,
		filename: avatarStorage_MW.fileName
	});
	const greetStorage = multer.diskStorage({
		destination: greetStorage_MW.destination,
		filename: greetStorage_MW.fileName
	});


	/*               */
	/* Authorization */
	/*               */

	// Register a user
	app.post(
		'/sign-up',
		signUp_MW(objRep),
		render_MW('index')
	);

	// Login a user
	app.post(
		'/sign-in',
		signIn_MW(objRep),
		render_MW('index')
	);

	// Logout a user
	app.get(
		'/sign-out',
		signOut_MW()
	);

	// Send new password request
	app.use(
		'/lost-pw',
		lostPW_MW(objRep),
		render_MW('ejs')
	);

	// Modify user's password
	// app.use(
	// 	'/new-pw/:uid/:secret', // jelszó módosítás
	// 	getUserBySecret_MW,
	// 	setUser_MW('password'),
	// 	render_MW('ejs')
	// );


	/*        */
	/* Feed's */
	/*        */

	// Get public or followed users' feed
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


	/*         */
	/* Profile */
	/*         */

	// Load a user's profile (even own)
	app.get(
		'/profile/:uid',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		getUsers_MW(objRep),
		getGreetsOfUser_MW(objRep),
		//getComments_MW(objRep),
		userFeedBack_MW(),
		render_MW('profile/profile')
	);

	// Get a user's avatar
	app.get(
		'/profile/avatar/:uid',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		sendAvatar_MW(objRep)
	);

	// Set/change user's avatar
	app.post(
		'/profile/set-avatar',
		auth_MW(objRep),
		multer({ storage: avatarStorage }).single('avatar'),
		setUserAvatar_MW(objRep)
	);

	// Delete user's avatar
	app.post(
		'/profile/del-avatar',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		delUserAvatar_MW(objRep)
	);

	// Follow or unfollow a user
	app.get(
		'/profile/follow/:uid',
		auth_MW(objRep),
		getUserByID_MW(objRep),
		followUser_MW(objRep)
	);


	/*         */
	/* Greet's */
	/*         */

	// Create new/modify a greet
	app.post(
		'/greet/:gid',
		auth_MW(objRep),
		getGreetByID_MW(objRep),
		multer({ fileFilter: fileFilter_MW, storage: greetStorage }).array('greet', 10),
		setGreetPics(),
		delGreetPics_MW(objRep),
		getUserByID_MW(objRep),
		setGreet_MW(objRep)
	);

	// Get the pics of a greet
	app.get(
		'/greets/:filename',
		auth_MW(objRep),
		sendGreetPic_MW(objRep)
	);

	// Like/unline a greet
	app.post(
		'/greet/like/:gid',
		auth_MW(objRep),
		getGreetByID_MW(objRep),
		likeGreet_MW(objRep)
	);

	// Delete a greet
	app.post(
		'/greet/del/:gid',
		auth_MW(objRep),
		delGreetPics_MW(objRep),
		delGreet_MW(objRep)
	);

	
	/*          */
	/* Homepage */
	/*          */

	app.get(
		'/',
		getUserByID_MW(objRep),
		redirectToFeed_MW(),
		getGreets_MW(objRep),
		userFeedBack_MW(),
		render_MW('index')
	);
};
