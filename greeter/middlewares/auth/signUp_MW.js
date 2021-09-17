/**
 * Creates a new user/visitor based on data from POST request.body
 *
 * 1. Checks if user/visitor (username, email) exists, if  exists res.locals.errors and return next
 * 2. If user doesn’t exist, then creates new user/visitor.
 * 3. Save to DB
 * 4. Create session and redirect to profile page
 * @param {*} objRep – models
 * @returns next()
 */
module.exports = (objRep) => {
	const { userModel, saveToDB, genPassHash, uuid } = objRep;
	return (req, res, next) => {
		if (
			typeof req.body.regEmail === 'undefined' ||
			typeof req.body.regPassword === 'undefined'
		) {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'signUp',
				message: 'Az email-cím és a jelszó megadása kötelező!',
			};
			return res.redirect('/');
		}

		try {
			res.locals.user = userModel.insert({
				uid: uuid.v4(),
				role:
					!req.body.regUsername ||
					!req.body.regFirstname ||
					!req.body.regLastname
						? 'visitor'
						: 'user',
				email: req.body.regEmail,
				password: genPassHash(req.body.regPassword, req.session.secret),
				...(req.body.regUsername && { username: req.body.regUsername }),
				...(req.body.regFirstname && { firstname: req.body.regFirstname }),
				...(req.body.regLastname && { lastname: req.body.regLastname }),
				following: [],
				followCount: 0,
				greetCount: 0,
				regDate: new Date(),
				lost: false,
			});
			req.session.uid = res.locals.user.uid;
		} catch (err) {
			console.log(err.message);
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'signUp',
				message: 'Az email-cím vagy felhasználónév foglalt!',
			};
			return res.redirect('/');
		}
		saveToDB();
		return res.redirect(`profile/${req.session.uid}`);
	};
};
