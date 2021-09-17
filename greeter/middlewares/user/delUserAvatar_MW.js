/**
 * Deletes user’s profile picture
 * 1. Delete file from filestorage
 * 2. Update res.locals.user.avatar to ’’
 * 3. Save to DB and redirect back
 * @param {*} objRep
 * @returns
 */
module.exports = (objRep) => {
	const { saveToDB, join, unlinkSync } = objRep;
	return (req, res, next) => {
		const filePath = `../../profile/avatar/${res.locals.userIn.uid}.${res.locals.userIn.avatar}`;

		try {
			unlinkSync(join(__dirname, filePath));
			res.locals.userIn.avatar = '';
		} catch (err) {
			if (err) return next(err);
		}
		saveToDB();
		console.log('removed: ', res.locals.userIn.uid);
		return res.redirect(`/profile/${res.locals.userIn.uid}`);
	};
};
