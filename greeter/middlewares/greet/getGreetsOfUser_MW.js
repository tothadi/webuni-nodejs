/**
 * Gets all greets of a user
 *
 * 1. Find greets in DB by res.locals.user.uid
 * 2. Defines res.locals.greets and adds author
 * 3. Returns next
 * @param {*} objRep – greetModel, userModel
 * @returns next
 */
module.exports = (objRep) => {
	const { greetModel, userModel } = objRep;
	return (req, res, next) => {
		try {
			res.locals.greets = greetModel
				.chain()
				.find({ author: res.locals.user.uid })
				.compoundsort([['date', true]])
				.data()
				.map((greet) => {
					const author = userModel.findOne({ uid: greet.author });
					greet.authorName = author.username;
					greet.authorAvatar = author.avatar;
					return greet;
				});
				// TODO - comments
		} catch (err) {
			if (err) return next(err);
		}
		return next();
	};
};
