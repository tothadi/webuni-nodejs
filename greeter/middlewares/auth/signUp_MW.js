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
			typeof req.body.email === 'undefined' ||
			typeof req.body.password === 'undefined'
		) {
			res.locals.errors = ['Az email-cím és a jelszó megadása kötelező!'];
			return next();
		}

		try {
			res.locals.user = userModel.insert({
				uid: uuid.v4(),
				role: !req.body.username || !req.body.fullname ? 'visitor' : 'user',
				email: req.body.email,
				password: genPassHash(req.body.password, req.session.secret),
				...(req.body.username && { username: req.body.username }),
				...(req.body.fullname && { fullname: req.body.fullname }),
				following: [],
				followCount: 0,
				greetCount: 0,
				regDate: new Date(),
				lost: false,
			});
			req.session.uid = res.locals.user.uid;
			res.redirect(`profile/${req.session.uid}`);
		} catch (err) {
			res.locals.errors = [err.message];
			return saveToDB(next);
		}
	};
};
