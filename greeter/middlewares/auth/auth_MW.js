/**
 * Checks if user is logged in
 * 
 * 1. If session.uid is not existing, redirects to '/' or in case of search returns next
 * 2. If session.uid exists, finds user in db and defines logged in user as res.locals.userIn
 * 3. If getting user data from db fails, redirects to '/'
 * 4. Returns next
 * @param {*} objRep - userModel
 * @param {*} search - boolean
 * @returns next
 */
module.exports = (objRep, search) => {
	const { userModel } = objRep;
	return (req, res, next) => {
		// Checks for available session user
		if (typeof req.session.uid === 'undefined') {
			// In case of search returns next
			if (search) {
				return next();
			}
			return res.redirect('/');
		}

		try {
			// Defines logged in user
			res.locals.userIn = userModel.findOne({ uid: req.session.uid });
		} catch (err) {
			if (err) {
				return res.redirect('/');
			}
		}
		return next();
	};
};
