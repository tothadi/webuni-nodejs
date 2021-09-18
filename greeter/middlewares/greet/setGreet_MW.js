/**
 * Creates or modifies a greet based on POST req.body data
 *
 * 1. Checks if req.body data exists, if not res.locals.errors and return
 * 2. Declare greet variable
 * 3. If res.locals.greet exists
 *	 1. greet variable = Find greet in DB by res.locals.greet
 *	 2. Set parameters to be updated by req.body data
 * 4. If res.locals.greet doesn’t exist
 *	 1. Define greet variable by req.body.data
 *	 2. Increase res.locals.user.greetCount by 1
 * 5. res.locals.success
 * 6. Save to DB and next
 * @param {*} objRep – common models, functions
 * @returns next()
 */
module.exports = (objRep) => {
	const { greetModel, saveToDB, v4 } = objRep;
	return (req, res, next) => {
		const redirectTo = req.body.redirectTo || '/';
		if (typeof req.body.text === 'undefined') {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'setGreet',
				message: 'Üres greet!',
			};
			return res.redirect(redirectTo);
		}

		try {
			if (res.locals.greet !== null) {
				res.locals.greet.text = req.body.text;
				return (req.session.feedBack = {
					fbType: 'fbSuccess',
					initiator: 'setGreet',
					message: 'A greet sikeresen módosítva.',
				});
			}
			greetModel.insert({
				gid: v4(),
				author: req.session.uid,
				likerIDs: [],
				likerCount: 0,
				text: req.body.text,
				pics: [],
				visibility: req.body.visibility ? 'public' : 'restricted',
				commentCount: 0,
				date: new Date().getTime(),
				...(req.body.regreetID && { regreetOf: req.body.regreetID }),
			});
			res.locals.user.greetCount++;
			req.session.feedBack = {
				fbType: 'fbSuccess',
				initiator: 'setGreet',
				message: 'A greet mentésre került.',
			};
		} catch (err) {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'setGreet',
				message: err.message,
			};
			return res.redirect(redirectTo);
		}
		saveToDB();
		return res.redirect(redirectTo);
	};
};
