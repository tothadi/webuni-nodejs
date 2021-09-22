/**
 * Finds user based on req.params.uid or session.uid
 *
 * 1. Checks if req.params.uid or session.uid exists, if not returns next
 * 2. If avatar request, defines uid from filename in URL
 * 3. Else defines user by req.params.uid or session.uid
 * 4. Finds user/visitor by uid in DB, in case of DB error, returns next(err)
 * 5. Defines res.locals.user
 * 6. Returns next()
 * @param objRepo – userModel
 * @returns next
 */
module.exports = (objRep) => {
	const { userModel } = objRep;
	return (req, res, next) => {
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
