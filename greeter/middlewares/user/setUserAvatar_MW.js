/**
 * Sets user’s profile picture to the one coming from POST multipart/form-data
 * 1. Save file to filestorage with filename: uid.ext
 * 2. If req.files undefined or files extension not ok, delete file and return redirect back
 * 3. Update res.locals.user.avatar with ext
 * 4. Save to DB and res.redirect back
 * @param objRepo – common models, functions
 * @returns redirects back
 */
module.exports = (objRep) => {
	const { fileExts, uuid } = objRep;
	return (req, res, next) => {
		const ext = req.file.originalname
			.substring(req.file.originalname.lastIndexOf('.') + 1)
			.toLowerCase();
		if (!fileExts.includes(ext)) {
			req.session.feedBack = {
				fbType: 'fbError',
				initiator: 'setAvatar',
				message: 'A kép formátuma nem megfelelő feltöltése nem sikerült!',
			};
			return res.redirect(`/profile/${res.locals.userIn.uid}`);
		}
		res.locals.userIn.avatar = ext;
		return res.redirect(`/profile/${res.locals.userIn.uid}`);
	};
};
