/**
 * Creates a logged in session for user/visitor based on data from POST request.body
 *
 * 1. Checks if user/visitor username exists or pw is OK, if not res.locals.errors and return next
 * 2. Create session and next()
 * @param {*} objRep – models
 * @returns next()
 */
module.exports = (objRep) => {
	const { userModel, checkPassHash } = objRep;
	return (req, res, next) => {
		if (
			typeof req.body.username === 'undefined' ||
			typeof req.body.password === 'undefined'
		) {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'signIn',
				message: 'A felhasználónév/email cím vagy jelszó nem megfelelő!',
			};
			return res.redirect('/');
		}

		try {
			res.locals.user = req.body.username.includes('@')
				? userModel.findOne({ email: req.body.username })
				: userModel.findOne({ username: req.body.username });
			if (res.locals.user === null) {
				throw new Error(
					'A felhasználónév/email cím vagy jelszó nem megfelelő!'
				);
			}
			if (!checkPassHash(req.body.password, res.locals.user.password)) {
				throw new Error(
					'A felhasználónév/email cím vagy jelszó nem megfelelő!'
				);
			}
			req.session.uid = res.locals.user.uid;
		} catch (err) {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'signIn',
				message: err.message,
			};
			return res.redirect('/');
		}
		return res.redirect('/feed/followed');
	};
};
