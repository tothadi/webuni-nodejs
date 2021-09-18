/**
 * Adds/deletes user to/from likers of greet and increases/decreases number of likers
 *
 * 1. If res.locals.greet.likerIDs includes session.uid, remove and decrease res.locals.greet.likerCount by 1
 * 2. Else push session.uid to res.locals.greet.likerIDs and increse res.locals.greet.likerCount by 1
 * 4. res.locals.success
 * 5. Save to DB and redirect back
 * @param {*} objRepo – common models, functions
 * @returns
 */
module.exports = (objRep) => {
	const { saveToDB } = objRep;
	return (req, res, next) => {
		
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
		saveToDB();
		return res.redirect(req.body.redirectTo);
	};
};
