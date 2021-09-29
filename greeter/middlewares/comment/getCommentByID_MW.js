/**
 * Finds Comment based on req.params.cid
 *
 * 1. If req params cid is new, generates cid then calls next
 * 2. If req params cid is a valid cid, tries to retrieve the comment from db
 *    creates res.locals.comment
 * 3. Returns next
 * @param {*} objRep – commentModel, uuid
 * @returns next
 */
module.exports = (objRep) => {
	const { commentModel, v4 } = objRep;
	return (req, res, next) => {
		
		// Adding new greet
		if (req.params.cid === 'new') {
			res.locals.cid = v4();
			res.locals.isNew = true;
			return next();
		}

		// Modifying existing greet
		try {
			res.locals.comment = commentModel.findOne({
				cid: req.params.cid,
			});
		} catch (err) {
			if (err) return next(err);
		}

		return next();
	};
};
