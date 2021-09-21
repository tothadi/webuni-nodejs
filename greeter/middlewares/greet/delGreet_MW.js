/**
 * Adds/deletes user to/from likers of greet and increases/decreases number of likers
 *
 * 1. Removes greet from db, decreases greetcount of author, comments??????????
 * 5. Save to DB and redirect back
 * @param {*} objRepo – common models, functions
 * @returns
 */
module.exports = (objRep) => {
	const { greetModel, saveToDB } = objRep;
	return (req, res, next) => {
		req.session.scroll = parseInt(req.body.scroll, 10);

		try {
			greetModel
				.chain()
				.find({
					gid: req.params.gid,
				})
				.remove();
			res.locals.userIn.greetCount--;

			// kommentek kezelése
		} catch (err) {
			if (err) return next(err);
		}
		saveToDB();
		return res.redirect(req.body.redirectTo);
	};
};
