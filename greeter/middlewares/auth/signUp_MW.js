/**
 * Creates a new user/visitor based on data from POST request.body
 * 
 * 1. Checks if user/visitor (username, email) exists, if  exists res.locals.errors and return next
 * 2. If user doesn’t exist, then creates new user/visitor.
 * 3. Save to DB
 * 4. Create session and redirect to profile page
 * @param {*} objRep – models
 * @returns next()
 */
module.exports = (objRep) => {
	return (req, res, next) => {
		return next();
	};
};
