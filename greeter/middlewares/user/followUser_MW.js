/**
 * Adds/removes a user to following list of logged-in user
 *
 * 1. If logged-in user's following list includes uid from req.params, removes user from following
 * 2. Else pushes suid from req.params to logge-in user's following
 * 3. Increase/decreases followed.followCount by 1
 * 4. Saves to DB and redirects back
 * @param {*} objRep - saveToDB
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { saveToDB } = objRep;
	return (req, res, next) => {
		
		try {
			// Checks if already followed
			if (res.locals.userIn.following.includes(res.locals.user.uid)) {
				// Finds uid in array
				let index = res.locals.userIn.following.indexOf(res.locals.user.uid);
				// Removes user from following array
				res.locals.userIn.following.splice(index, 1);
				// Decreases followed.followCount by 1
                res.locals.user.followCount--;
			} else {
				// Adds user to following array
				res.locals.userIn.following.push(res.locals.user.uid);
				// Increase followed.followCount by 1
				res.locals.user.followCount++;
			}
		} catch (err) {
			if (err) return next(err);
		}
		return saveToDB(res.redirect(req.body.redirectTo));
	};
};
