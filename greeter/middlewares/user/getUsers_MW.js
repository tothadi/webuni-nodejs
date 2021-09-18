/**
 * Gets multiple users by following of userIn
 *
 * 1. res.locals.users
 * 2. return next
 * @param objRepo – common models, functions
 * @returns next()
 */
module.exports = (objRep) => {
	const { userModel } = objRep;
	return (req, res, next) => {
		try {
			res.locals.users = userModel.find({
				uid: {
					$in: [res.locals.userIn.following],
				},
			});
		} catch (err) {
			if (err) {
				return next(err);
			}
		}

		return next();
	};
};
