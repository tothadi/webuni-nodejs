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
	const { greetModel, saveToDB, uuid } = objRep;
	return (req, res, next) => {
		if (typeof req.body.text === 'undefined') {
			res.locals.errors = ['Üres greet!'];
			return next();
		}

		try {
			if (typeof res.locals.greet === 'undefined') {
				greetModel.insert({
					gid: uuid.v4(),
					author: req.session.uid,
					likerIDs: [],
					likerCount: 0,
					text: req.body.text,
					pics: [],
					visibility: req.body.visibility,
					commentCount: 0,
					date: new Date(),
					...(req.body.regreetID && { regreetOf: req.body.regreetID }),
				});
				res.locals.user.greetCount++;
				res.locals.success = 'A greet mentésre került.';
			} else {
				res.locals.greet.text = req.body.text;
				res.locals.success = 'A greet sikeresen módosítva.';
			}
			
		} catch (err) {
			if (err) return next(err);
		}
		return saveToDB(next);
	};
};
