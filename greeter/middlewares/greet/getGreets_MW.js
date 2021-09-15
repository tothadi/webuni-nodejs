/**
 * Gets all public greets
 *
 * 1. Find public greets in DB
 * 2. res.locals.greets
 * 3. return next
 * @param {*} objRep – common models, functions
 * @returns next()
 */
module.exports = (objRep) => {
	const { greetModel, userModel } = objRep;
	return (req, res, next) => {
		try {
			res.locals.greets = greetModel
				.find({ visibility: 'public' })
				.map((greet) => {
					const author = userModel.findOne({ uid: greet.author });
					greet.authorName = author.username;
					greet.authorAvatar = author.avatar;
					return greet;
				});
		} catch (err) {
			if (err) return next(err);
		}
		return next();
	};
};
