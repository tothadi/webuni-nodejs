/**
 * Finds user based on req.params.uid or session.uid
 * 
 * 1. Checks if req.params.uid or session.uid exists if not return next
 * 2. if req.params.uid define ID as req.param.uid
 * 3. if no req.params.uid define ID as session.uid
 * 4. Finds user/visitor by ID in DB, if no user res.redirect(’/’)
 * 5. res.locals.user
 * 6. return next
 * @param objRepo – common models, functions
 * @returns next()
 */
module.exports = (objRep) => {
	const { userModel } = objRep;
	return (req, res, next) => {
		if (typeof req.session.uid === 'undefined' && typeof req.params.uid === 'undefined') {
			return next();
		}

        const id = req.params.uid.split('.')[0] || req.session.uid;
		
		try {
			res.locals.user = userModel.findOne({ uid: id });
		} catch (err) {
			if (err) {
				return next(err);
			}
		}

		return next();
	};
};