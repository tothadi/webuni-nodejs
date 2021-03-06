/**
 * Sets user's password
 *
 * 1. Checks if req.body available
 * 2. Sets new password hash on userModel
 * 3. Saves password to DB and redirects to '/'
 * @param {*} objRep - saveToDB, password service
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { saveToDB, genPassHash } = objRep;
	return (req, res, next) => {
        
        // Checks if req.body available (if not, calls next to render recovery view)
        if (typeof req.body.newpassword === 'undefined') {
            res.locals.secret = req.params.secret;
            return res.render('profile/new-pw');
        }

        // Sets new password hash on user
        res.locals.user.password = genPassHash(req.body.newpassword);

        // Resets secret
        res.locals.user.lost = false;

        req.session.feedBack = {
            status: 'success',
            message: `A jelszót sikeresen megváltoztattad!`
        }

		return saveToDB(res.redirect('/'));
	};
};
