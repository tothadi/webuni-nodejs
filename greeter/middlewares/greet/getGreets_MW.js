/**
 * Gets all public greets
 *
 * 1. Find public greets in DB
 * 2. Defines res.locals.greets and adds author
 * 3. Returns next
 * @param {*} objRep – greetModel, userModel
 * @returns next
 */
module.exports = (objRep) => {
	const { greetModel, userModel } = objRep;
	return (req, res, next) => {
		try {
			// Defining filter for Loki
			const filter =
				typeof req.params.whichfeed === 'undefined'
					? { visibility: 'public' }
					: req.params.whichfeed === 'public'
					? {}
					: {
							author: {
								$in: [res.locals.user.uid, ...res.locals.user.following],
							},
					  };

			// Filters public greets and adds author's username and avatar data to it
			// TODO - comments
			res.locals.greets = greetModel
				.chain()
				.find(filter)
				.compoundsort([['date', true]])
				.data()
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
