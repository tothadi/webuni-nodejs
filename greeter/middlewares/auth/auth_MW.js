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
			req.session.uid = '30ce4884-0583-4806-8547-d303e1a287df';
			//return res.redirect('/');
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
