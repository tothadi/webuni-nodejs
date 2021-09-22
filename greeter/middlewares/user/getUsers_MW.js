/**
 * Gets multiple users by following array of userIn
 *
 * 1. Retreives users from DB by array of uids
 * 2. Defines res.locals.users
 * 2. Returns next()
 * @param objRepo – userModel
 * @returns next
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
