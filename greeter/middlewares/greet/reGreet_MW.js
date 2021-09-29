/**
 * Creates a regreet based on POST req.body data (not mandatory) and res.locals.greet
 *
 * 1. Checks if user already regreeted the greet
 * 2. Creates a new great with a field regreetOf = req.params.gid
 * 3. If req.body data present then sets the provided properties accordingly
 * 4. Increases res.locals.user.greetCount by 1
 * 5. Save to DB and redirect
 * @param {*} objRep - greetModel, saveToDB, uuid
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { greetModel, saveToDB, v4 } = objRep;
	return (req, res, next) => {

		// Checks if user already regreeted the greet
		if (res.locals.greets.filter((greet) => greet.regreetOf === res.locals.greet.gid).length) {
			// Creates error feedback
			// Available after redirect
			req.session.feedBack = {
				status: 'error',
				message: 'Már regreetelted!',
			};
			return res.redirect(req.body.redirectTo);
		}

		try {
			// Case: new greet
			greetModel.insert({
				gid: v4(),
				author: req.session.uid,
				likerIDs: [],
				likerCount: 0,
				text: req.body.text || '',
				pics: [],
				visibility: res.locals.greet.visibility,
				comments: [],
				commentCount: 0,
				date: new Date().getTime(),
				regreetOf: req.session.gid,
			});

			// Increase author's greetcount
			res.locals.userIn.greetCount++;

			req.session.feedBack = {
				status: 'success',
				message: 'Sikeresen regreetelted!',
			};

		} catch (err) {

			// Creates error feedback - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: err.message,
			};
			return res.redirect(req.body.redirectTo);
		}

		return saveToDB(res.redirect(req.body.redirectTo));
	};
};
