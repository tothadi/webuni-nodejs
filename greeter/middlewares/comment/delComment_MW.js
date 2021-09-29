/**
 * Deletes a comment
 *
 * 1. Removes comment from db, decreases commentcount of author and greet
 * 2. Removes comment from greets comments property
 * 3. Save to DB and redirects back
 * @param {*} objRepo – commentModel, saveToDB
 * @returns Redirects
 */
 module.exports = (objRep) => {
	const { commentModel, saveToDB } = objRep;
	return (req, res, next) => {

		try {
			// Removes greet
			commentModel
				.chain()
				.find({
					cid: req.params.cid,
				})
				.remove();

			// Decreases commentcount of author and greet
			res.locals.userIn.commentCount--;
			res.locals.greet.commentCount--;

			// Removes comment from greets comments property
			res.locals.greet.comments = res.locals.greet.comments.filter(comment => comment.cid !== req.params.cid);

			// Creates success feedback
			// Available after redirect
			req.session.feedBack = {
				status: 'success',
				message: 'A komment törlésre került.',
			};

		} catch (err) {
			if (err) return next(err);
		}
		return saveToDB(res.redirect(req.body.redirectTo));
	};
};