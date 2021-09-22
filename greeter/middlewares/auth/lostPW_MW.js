/**
 * Generates a link based on data from POST request.body.username or req.body.email where user/visitor can change password
 *
 * 1. Checks if req.body available, if not redirects to '/'
 * 2. Gets user from db by username or email. If no user, creates error feedback and redirect to '/'
 * 3. Generates a secret and stores in userModel
 * 4. Sends email via email service with user email and generated secret as parameters.
 *    Returns feedback - available after redirect
 * 5. Saves secret to DB and redirects
 * @param {*} objRep - userModel, saveToDB, uuid, email service
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { userModel, saveToDB, sendUserMail, v4 } = objRep;
	return (req, res, next) => {

		// Checks if req.body available
		if (typeof req.body === 'undefined') {
			return res.redirect('/');
		}

		try {

			// Gets user from db by username or email
			const user = req.body.lostusername.includes('@')
				? userModel.findOne({ email: req.body.lostusername })
				: userModel.findOne({ username: req.body.lostusername });
			if (user === null) {
				throw new Error(
					'Nem létezik felhasználó ezekkel az adatokkal!'
				);
			}

			// Generates a secret and stores in userModel
			user.lost = v4();

			// Sends email via email service with user email and generated secret as parameters.
			// Returns feedback - available after redirect
			req.session.feedBack = sendUserMail(user.email, user.lost);

		} catch (err) {

			// Creates error feedback from error thrown in try - available after redirect
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'emailService',
				message: err.message,
			};
			return res.redirect('/');
		}
		saveToDB();
		return res.redirect('/');
	}
}