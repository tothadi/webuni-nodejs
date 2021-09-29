/**
 * Deletes a greet
 *
 * 1. Removes greet from db, decreases greetcount of author
 * 2. Removes comments associated to greet and recalculates user's commentCount
 * 3. Save to DB and redirects back
 * @param {*} objRepo – greetModel, commentModel, saveToDB
 * @returns Redirects
 */
module.exports = (objRep) => {
	const { greetModel, commentModel, saveToDB } = objRep;
	return (req, res, next) => {
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

			// Removes comments of greet
			commentModel.chain().find({ gid: req.params.gid }).remove();

			// Recalculates user's commentcount
			res.locals.userIn.commentCount = commentModel.find({
				author: res.locals.userIn.uid,
			}).length;

			// Creates success feedback
			// Available after redirect
			req.session.feedBack = {
				status: 'success',
				message: 'A greet törlésre került.',
			};
		} catch (err) {
			if (err) return next(err);
		}
		return saveToDB(res.redirect(req.body.redirectTo));
	};
};
