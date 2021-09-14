/**
 * Finds Greet based on req.params.gid
 *
 * 1. Finds greet by gid in DB, if no greet return next
 * 2. res.locals.greet
 * 3. return next
 * @param {*} objRep – common models, functions
 * @returns next()
 */
module.exports = (objRep) => {
	const { greetModel } = objRep;
	return (req, res, next) => {
		try {
			res.locals.greet = greetModel.findOne({
				gid: req.params.gid,
			});
		} catch (err) {
			if (err) return next(err);
		}
		return next();
	};
};
