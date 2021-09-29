/**
 * Gets greets by search-text
 *
 * 1. Find public or all greets in DB
 * 2. Defines res.locals.greets and adds author, and comments
 * 3. Filters greets by search keywords
 * 4. Returns next
 * @param {*} objRep – greetModel, userModel, commentModel
 * @returns next
 */
module.exports = (objRep) => {
	const { greetModel, userModel, commentModel } = objRep;
	return (req, res, next) => {

        // After redirect
        if (req.method === 'GET') {
            // Checks if query came from an existing session
            if (typeof req.session.greets === 'undefined') {
                return res.redirect('/');
            }
            // Sets greets for render after redirect
            res.locals.greets = req.session.greets;
            return next();
        }

        // After user search query

		const searchtext = req.body.searchtext.toLowerCase().split(' ');
		try {
			// Defining filter for Loki
			const filter =
				typeof req.session.uid === 'undefined' ? { visibility: 'public' } : {};

			// If no user logged in filters public greets and adds author's username and avatar data to it
			// Adds comments to greetobject
			// Filters greets by search keywords
			req.session.greets = greetModel
				.chain()
				.find(filter)
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
				})
				.filter((greet) => {
					let results = 0;
					searchtext.forEach((word) => {
						if (
							greet.authorName.toLowerCase() === word ||
							greet.text.toLowerCase().includes(word) ||
                            (typeof greet.regreeted !== 'undefined' && (greet.regreeted.authorName.toLowerCase() === word ||
							greet.regreeted.text.toLowerCase().includes(word)))
						) {
							results++;
						}
					});
					if (results > 0) {
						return greet;
					}
				});
		} catch (err) {
			if (err) return next(err);
		}
		return res.redirect('/search');
	};
};
