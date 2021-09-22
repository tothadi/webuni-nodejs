/**
 * Creates a new user/visitor based on data from POST request.body
 *
 * 1. Checks if necessary data available in req.body and if user/visitor username/password exists
 * 2. If exists, adds feedback data to req.session so it's avaliable after redirect.
 * 3. If username, firstname or lastname is missing from request, adds visitor role
 * 4. Generates uid (adds it to session) and password hash
 * 3. Saves to DB
 * 4. Redirects to profile page
 * @param {*} objRep – userModel, saveToDB, password hash service, uuid
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { userModel, saveToDB, genPassHash, v4 } = objRep;
	return (req, res, next) => {
		// Checks if minimum data arrived
		if (
			typeof req.body.regEmail === 'undefined' ||
			typeof req.body.regPassword === 'undefined'
		) {
			// Creates error feedback - available after redirect
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'signUp',
				message: 'Az email-cím és a jelszó megadása kötelező!',
			};
			return res.redirect('/');
		}

		try {
			// Creates new user - Loki checks if exists
			const user = userModel.insert({
				uid: v4(),
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
				avatar: '',
				greetCount: 0,
				commentCount: 0,
				regDate: new Date(),
				lost: false,
			});
			req.session.uid = user.uid;
		} catch (err) {
			// Creates error feedback of existing user - available after redirect
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
