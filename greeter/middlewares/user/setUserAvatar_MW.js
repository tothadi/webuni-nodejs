/**
 * Sets user’s profile picture to the one coming from multer
 * 
 * 1. Gets fileextension from filename
 * 2. Updates logged-in user's avatar field with extension
 * 4. Save to DB and redirect back
 * @param {*} objRep - saveToDB
 * @returns Redirect
 */
module.exports = (objRep) => {
	const {saveToDB } = objRep;
	return (req, res, next) => {
		const ext = req.file.filename
			.substring(req.file.originalname.lastIndexOf('.') + 1)
			.toLowerCase();
		res.locals.userIn.avatar = ext;
		saveToDB();
		return res.redirect(`/profile/${res.locals.userIn.uid}`);
	};
};
