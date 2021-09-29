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
			typeof req.body.regemail === 'undefined' ||
			typeof req.body.regpassword === 'undefined'
		) {
			// Creates error feedback - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: 'Az email-cím és a jelszó megadása kötelező!',
			};
			req.session.modal = 'signup';
			return res.redirect('/');
		}

		try {
			// Creates new user - Loki checks if exists
			const user = userModel.insert({
				uid: v4(),
				role:
					!req.body.regusername ||
					!req.body.regfirstname ||
					!req.body.reglastname
						? 'visitor'
						: 'user',
				email: req.body.regemail,
				password: genPassHash(req.body.regpassword),
				username: req.body.regusername || req.body.regemail,
				...(req.body.regfirstname && { firstname: req.body.regfirstname }),
				...(req.body.reglastname && { lastname: req.body.reglastname }),
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
				status: 'danger',
				message: 'Az email-cím vagy felhasználónév foglalt!',
			};

			// Sets which modal should be opened after redirect
			req.session.modal = 'signup';
			return res.redirect('/');
		}
		return saveToDB(res.redirect(`profile/${req.session.uid}`));
	};
};
