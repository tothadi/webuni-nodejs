/**
 * Finds user based on req.params.uid or session.uid
 *
 * 1. If req.params.secret exists, find user by user.lost and calls next. If no user with secret, redirects to '/'
 * 2. Checks if req.params.uid or session.uid exists, if not returns next
 * 3. If avatar request, defines uid from filename in URL
 * 4. Else defines user by req.params.uid or session.uid
 * 5. Finds user/visitor by uid in DB, in case of DB error, returns next(err)
 * 6. Defines res.locals.user
 * 7. Returns next()
 * @param objRepo – userModel
 * @returns next
 */
module.exports = (objRep) => {
	const { userModel } = objRep;
	return (req, res, next) => {

		// If req.params.secret exists, find user by user.lost and calls next
		// If no user with secret, redirects to '/'
		if (typeof req.params.secret !== 'undefined') {
			try {
				res.locals.user = userModel.findOne({ lost: req.params.secret });
				// If user is null, '/'
				if (res.locals.user === null) {
					return res.redirect('/');
				}
			} catch (err) {
				if (err) {
					return res.redirect('/');
				}
			}
			return next();
		}

		// Checks if req.params.uid or session.uid exists, if not returns next (no need for user data on route)
		if (
			typeof req.session.uid === 'undefined' &&
			typeof req.params.uid === 'undefined'
		) {
			return next();
		}

		// Gets uid from request url filename for sending avatar
		if (typeof req.params.uid !== 'undefined' && req.params.uid.includes('.')) {
			req.params.uid = req.params.uid.split('.')[0];
		}

		// If req params uid defined, retrieves user by that, else retrieves logged in user
		const id = req.params.uid || req.session.uid;
		try {
			res.locals.user = userModel.findOne({ uid: id });
		} catch (err) {
			if (err) {
				return next(err);
			}
		}

		return next();
	};
};
