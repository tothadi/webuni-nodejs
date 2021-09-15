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
			req.session.signUpError = 'Az email-cím és a jelszó megadása kötelező!';
			return res.redirect('/');
		}

		try {
			res.locals.user = userModel.insert({
				uid: uuid.v4(),
				role: !req.body.username || !req.body.fullname ? 'visitor' : 'user',
				email: req.body.email,
				password: genPassHash(req.body.password, req.session.secret),
				...(req.body.username && { username: req.body.username }),
				...(req.body.firstname && { firstname: req.body.firstname }),
				...(req.body.lastname && { lastname: req.body.lastname }),
				following: [],
				followCount: 0,
				greetCount: 0,
				regDate: new Date(),
				lost: false,
			});
			req.session.uid = res.locals.user.uid;
		} catch (err) {
			console.log(err.message)
			req.session.signUpError = 'Az email-cím vagy felhasználónév foglalt!';
			return res.redirect('/');
		}
		saveToDB();
		return res.redirect(`profile/${req.session.uid}`);
	};
};
