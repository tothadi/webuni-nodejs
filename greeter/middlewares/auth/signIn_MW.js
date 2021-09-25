/**
 * Creates a logged in session for user/visitor based on data from POST request.body
 *
 * 1. Checks if user/visitor username exists or pw is OK
 * 2. If not, adds feedback data to req.session so it's avaliable after redirect.
 * 3. Create session.uid
 * 4. Returns next
 * @param {*} objRep – userModel, password check service
 * @returns next()
 */
module.exports = (objRep) => {
	const { userModel, checkPassHash } = objRep;
	return (req, res, next) => {
		// Checks if minimum request data arrived
		if (
			typeof req.body.username === 'undefined' ||
			typeof req.body.password === 'undefined'
		) {
			// Creates error feedback - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: 'A felhasználónév/email cím vagy jelszó nem megfelelő!',
			};
			req.session.modal = 'signin';
			return res.redirect('/');
		}

		try {
			// Checks username and password, creates session
			const user = req.body.username.includes('@')
				? userModel.findOne({ email: req.body.username })
				: userModel.findOne({ username: req.body.username });
			if (user === null) {
				throw new Error(
					'A felhasználónév/email cím vagy jelszó nem megfelelő!'
				);
			}
			if (!checkPassHash(req.body.password, user.password)) {
				throw new Error(
					'A felhasználónév/email cím vagy jelszó nem megfelelő!'
				);
			}
			req.session.uid = user.uid;
		} catch (err) {
			// Creates error feedback from error thrown in checks - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: err.message,
			};
			req.session.modal = 'signin';
			return res.redirect('/');
		}
		return res.redirect('/feed/followed');
	};
};
