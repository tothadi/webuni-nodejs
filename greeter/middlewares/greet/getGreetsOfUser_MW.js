/**
 * Gets all greets of a user
 *
 * 1. Find greets in DB by res.locals.user.uid
 * 2. Defines res.locals.greets and adds author
 * 3. Returns next
 * @param {*} objRep – greetModel, userModel, commentModel
 * @returns next
 */
module.exports = (objRep) => {
	const { greetModel, userModel, commentModel } = objRep;
	return (req, res, next) => {
		try {
			// Filters user's greets and adds author's username and avatar data to it
			// Adds comments to greetobject
			res.locals.greets = greetModel
				.chain()
				.find({ author: res.locals.user.uid })
				.compoundsort([['date', true]])
				.data()
				.map((greet) => {
					const author = userModel.findOne({ uid: greet.author });
					greet.comments = commentModel
						.chain()
						.find({ gid: greet.gid })
						.compoundsort([['date', true]])
						.data();
					if (typeof greet.regreetOf !== 'undefined') {
						greet.regreeted = greetModel.findOne({ gid: greet.regreetOf });
					}
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
