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
			typeof req.body.updatefirstname === 'undefined' ||
			typeof req.body.updatelastname === 'undefined' ||
			typeof req.body.updateusername === 'undefined'
		) {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'updateUser',
				message: `Minden mező kitöltése szükséges!`,
			};
			return res.redirect(`/profile/${res.locals.userIn.uid}`);
		}

		// Sets new password hash on user
		res.locals.userIn.firstname = req.body.updatefirstname;
		res.locals.userIn.lastname = req.body.updatelastname;
		res.locals.userIn.username = req.body.updateusername;
		res.locals.userIn.role = 'user';

		req.session.feedBack = {
			fbType: 'fbSuccess',
			initiator: 'updateUser',
			message: `Teljes értékű felhasználóként, most már tudsz greetelni!`,
		};

		saveToDB();
		return res.redirect(`/profile/${res.locals.userIn.uid}`);
	};
};
