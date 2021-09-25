/**
 * Adds/deletes user to/from likers of greet and increases/decreases number of likers
 *
 * 1. If res.locals.greet.likerIDs includes session.uid, removes user from likers
 * 2. Else pushes session.uid to likerIDs
 * 4. Calculates likerCount of greet
 * 5. Saves to DB and redirects back
 * @param {*} objRepo – saveToDB
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { saveToDB } = objRep;
	return (req, res, next) => {
		// Creates scroll data so browser knows where to scroll back
		req.session.scroll = parseInt(req.body.scroll, 10);

		try {
			if (res.locals.greet.likerIDs.includes(req.session.uid)) {
				let index = res.locals.greet.likerIDs.indexOf(req.session.uid);
				res.locals.greet.likerIDs.splice(index, 1);
			} else {
				res.locals.greet.likerIDs.push(req.session.uid);
			}
			res.locals.greet.likerCount = res.locals.greet.likerIDs.length;
		} catch (err) {
			if (err) return next(err);
		}
		return saveToDB(res.redirect(req.body.redirectTo));
	};
};
