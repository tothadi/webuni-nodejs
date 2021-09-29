/**
 * Creates or modifies a greet based on POST req.body data
 *
 * 1. Checks if req.body data exists
 *    If not, adds feedback data to req.session so it's avaliable after redirect.
 *    Redirects back
 * 2. If editing
 *	  Sets parameters of greet stored in res.locals to be updated by req.body data
 *    Creates success feedback available after redirect
 * 3. If new
 *	  Creates new greet from req.body.data
 *	  Increases loggid in user's greetCount by 1
 * 4. Creates success feedback available after redirect
 * 5. Saves to DB and redirects back
 * @param {*} objRep – greetModel, saveToDB
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { greetModel, saveToDB } = objRep;
	return (req, res, next) => {

		// If redirect url not available from request sets it to '/'
		const redirectTo = req.body.redirectTo;

		if (typeof req.body.text === 'undefined') {
			// Creates error feedback - available after redirect
			req.session.feedBack = {
				status: 'danger',
				message: 'Üres greet!',
			};
			return res.redirect(redirectTo);
		}

		// Case: editing an existing greet
		if (!res.locals.isNew) {
			res.locals.greet.text = req.body.text;
			res.locals.greet.pics = res.locals.greetPics;
			res.locals.greet.visibility = req.body.visibility
				? 'public'
				: 'restricted';
			if (typeof req.session.feedBack === 'undefined') {
				// Creates success feedback if fileupload haven't already created error feedback
				// Available after redirect
				req.session.feedBack = {
					status: 'success',
					message: 'A greet sikeresen módosítva.',
				};
			}

			// Creates scroll data so browser knows where to scroll back
			// Can't be set in setRenderVars_MW because of enctype
			req.session.scroll = req.body.scroll;

			return saveToDB(res.redirect(redirectTo));
		}

		try {
			// Case: new greet
			res.locals.greet = greetModel.insert({
				gid: req.session.gid,
				author: req.session.uid,
				likerIDs: [],
				likerCount: 0,
				text: req.body.text,
				pics: res.locals.greetPics,
				visibility: req.body.visibility ? 'public' : 'restricted',
				comments: [],
				commentCount: 0,
				date: new Date().getTime(),
			});

			// Increase author's greetcount
			res.locals.userIn.greetCount++;

			if (typeof req.session.feedBack === 'undefined') {
				// Creates success feedback if fileupload haven't already created error feedback
				// Available after redirect
				req.session.feedBack = {
					status: 'success',
					message: 'A greet mentésre került.',
				};
			}

			// Creates scroll data so browser knows where to scroll back
			// Can't be set in setRenderVars_MW because of enctype
			req.session.scroll = req.body.scroll;
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
