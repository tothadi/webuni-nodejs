/**
 * Updates logged-in user's avatar field with extension
 * 
 * @param {*} objRep - saveToDB
 * @returns Redirect
 */
module.exports = (objRep) => {
	const {saveToDB } = objRep;
	return (req, res, next) => {
		res.locals.userIn.avatar = req.session.ext;
		saveToDB();
		return res.redirect(`/profile/${res.locals.userIn.uid}`);
	};
};
