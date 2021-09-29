/**
 * Creates or modifies a greet based on POST req.body data
 * req.body params required: text, redirectTo, scroll
 *
 * 1. Checks if req.body data exists
 *    If not, adds feedback data to req.session so it's avaliable after redirect.
 *    Redirects back
 * 2. If editing
 *	  Sets parameters of comment stored in res.locals to be updated by req.body data
 *    Creates success feedback available after redirect
 * 3. If new
 *	  Creates new comment from req.body.data
 *	  Increases loggid in user's commentCount by 1
 *    Increases commentCount of greet by 1
 * 4. Creates success feedback available after redirect
 * 5. Saves to DB and redirects back
 * @param {*} objRep – commentModel, saveToDB
 * @returns next
 */
module.exports = (objRep) => {
	const { commentModel, saveToDB } = objRep;
	return (req, res, next) => {
		const redirectTo = res.locals.redirectTo;
		if (typeof req.body.text === 'undefined') {
			// Creates error feedback - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: 'Üres komment!',
			};
			return res.redirect(redirectTo);
		}

		// Case: editing an existing comment
		if (!res.locals.isNew) {
			res.locals.comment.text = req.body.text;

			// Creates success feedback
			// Available after redirect
			req.session.feedBack = {
				status: 'success',
				message: 'A komment sikeresen módosítva.',
			};

			// Set scroll for render after redirect
			req.session.scroll = res.locals.comment.cid;

			return saveToDB(res.redirect(redirectTo));
		}

		// Case: new greet
		try {
			res.locals.comment = commentModel.insert({
				cid: res.locals.cid,
				gid: res.locals.greet.gid,
				author: res.locals.userIn.uid,
				authorAvatar: res.locals.userIn.avatar,
				authorName: res.locals.userIn.username,
				text: req.body.text,
				date: new Date().getTime(),
			});

			// Increase commentcount of author and greet
			res.locals.userIn.commentCount++;
			res.locals.greet.commentCount++;

			// Creates success feedback
			// Available after redirect
			req.session.feedBack = {
				status: 'success',
				message: 'A komment mentésre került.',
			};

			// Set scroll for render after redirect
			req.session.scroll = res.locals.cid;

		} catch (err) {
			// Creates error feedback - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: err.message,
			};
			return res.redirect(redirectTo);
		}

		return saveToDB(res.redirect(redirectTo));
	};
};
