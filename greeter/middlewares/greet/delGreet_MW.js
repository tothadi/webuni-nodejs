/**
 * Deletes a greet
 *
 * 1. Removes greet from db, decreases greetcount of author
 * 2. TODO - comments
 * 3. Save to DB and redirects back
 * @param {*} objRepo – greetModel, saveToDB
 * @returns Redirects
 */
module.exports = (objRep) => {
	const { greetModel, saveToDB } = objRep;
	return (req, res, next) => {
		// Creates scroll data so browser knows where to scroll back
		req.session.scroll = parseInt(req.body.scroll, 10);

		try {
			// Removes greet
			greetModel
				.chain()
				.find({
					gid: req.params.gid,
				})
				.remove();
			// Decreases author's greetcount
			res.locals.userIn.greetCount--;

			// TODO kommentek kezelése
		} catch (err) {
			if (err) return next(err);
		}
		saveToDB();
		return res.redirect(req.body.redirectTo);
	};
};
