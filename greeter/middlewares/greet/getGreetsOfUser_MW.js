/**
 * Gets all greets from user
 * 
 * 1. Find greets in DB by res.locals.user.uid
 * 2. res.locals.greets
 * 3. return next
 * @param {*} objRep – common models, functions
 * @returns next()
 */
module.exports = (objRep) => {
	const { greetModel, userModel } = objRep;
	return (req, res, next) => {
		try {
			res.locals.greets = greetModel.find({ author: res.locals.user.uid })
				.map(
					(greet) => {
						const author = userModel.findOne({ uid: greet.author })
						console.log(author)
						greet.authorName = author.username;
						greet.authorAvatar = author.avatar;
						return greet;
					}
				);
		} catch (err) {
			if (err) return next(err);
		}
		return next();
	};
};