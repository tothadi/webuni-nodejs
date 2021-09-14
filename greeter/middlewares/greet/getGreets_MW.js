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
				.map(
					(greet) => {
						greet.authorName = userModel.findOne({ uid: greet.author }).username;
						return greet;
					}
				);
		} catch (err) {
			if (err) return next(err);
		}
		return next();
	};
};
