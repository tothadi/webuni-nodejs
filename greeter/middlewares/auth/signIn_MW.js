/**
 * Creates a logged in session for user/visitor based on data from POST request.body
 *
 * 1. Checks if user/visitor username exists or pw is OK, if not res.locals.errors and return next
 * 2. Create session and redirect to feed/followed page
 * @param {*} objRep – models
 * @returns next()
 */
module.exports = (objRep) => {
	return (req, res, next) => {
		return next();
	};
};
