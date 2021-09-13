/**
 * Generates a link based on data from POST request.body.username or req.body.email where user/visitor can change password
 * 
 * 1. Checks if req.body.username or req.body.email exists, if not return next
 * 2. Gets user/visitor from db by username or email (if no user res.locals.errors, return next)
 * 3. Generates a secret
 * 4. Updates user.secret
 * 5. Sends secret to user/visitor via email
 * 6. res.locals.success
 * 7. Saves secret to DB and next
 * @param {*} objRep 
 * @returns next()
 */
module.exports = (objRep) => {
	return (req, res, next) => {
		return next();
	};
};