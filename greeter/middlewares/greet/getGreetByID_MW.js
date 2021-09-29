/**
 * Finds Greet based on req.params.gid
 *
 * 1. If req params gid is new, generates gid and initializes array for picture filenames, then calls next
 * 2. If req params gid is a valid gid, tries to retrieve the greet from db
 *    creates res.locals.greet
 * 3. Adds req.session.gid for multer filenaming
 * 4. Returns next
 * @param {*} objRep – greetModel, uuid
 * @returns next
 */
module.exports = (objRep) => {
	const { greetModel, v4 } = objRep;
	return (req, res, next) => {
		
		// Adding new greet
		if (req.params.gid === 'new') {
			req.session.gid = v4();
			res.locals.isNew = true;
			res.locals.greetPics = [];
			return next();
		}

		// Modifying existing greet
		try {
			res.locals.greet = greetModel.findOne({
				gid: req.params.gid,
			});
		} catch (err) {
			if (err) return next(err);
		}

		req.session.gid = res.locals.greet.gid;
		return next();
	};
};
