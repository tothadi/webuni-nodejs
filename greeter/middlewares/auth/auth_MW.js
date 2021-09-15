/**
 * Checks if session.uid exists, and if yes finds user by id for res.locals.user. If not redirects to '/'
 *
 * @param {*}
 * @returns next()
 */
module.exports = (objRep) => {
	const { userModel } = objRep;
	return (req, res, next) => {
		if (typeof req.session.uid === 'undefined') {
			//req.session.uid = '867324c6-320a-4af0-864c-79a17fe265d7';
			return res.redirect('/');
		}

		try {
			res.locals.user = userModel.findOne({ uid: req.session.uid });
		} catch (err) {
			if (err) {
				return res.redirect('/');
			}
		}

		return next();
	};
};
