/**
 * Adds missing information to userModel. Sets user from visitor to user
 *
 * @param {*} objRep - saveToDB, password service
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { saveToDB } = objRep;
	return (req, res, next) => {
		if (
			typeof req.body.upgradefirstname === 'undefined' ||
			typeof req.body.upgradelastname === 'undefined' ||
			typeof req.body.upgradeusername === 'undefined'
		) {
			req.session.feedBack = {
				status: 'error',
				message: `Minden mező kitöltése szükséges!`,
			};
			return res.redirect(`/profile/${res.locals.userIn.uid}`);
		}

		// Sets new password hash on user
		res.locals.userIn.firstname = req.body.upgradefirstname;
		res.locals.userIn.lastname = req.body.upgradelastname;
		res.locals.userIn.username = req.body.upgradeusername;
		res.locals.userIn.role = 'user';

		req.session.feedBack = {
			status: 'success',
			message: `Teljes értékű felhasználóként, most már tudsz greetelni!`,
		};
		
		return saveToDB(res.redirect(`/profile/${res.locals.userIn.uid}`));
	};
};
