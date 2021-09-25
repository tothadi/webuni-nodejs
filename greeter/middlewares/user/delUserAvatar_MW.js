/**
 * Deletes user’s profile picture
 * 1. Delete file from filestorage
 * 2. Resets extension stored in user object
 * 3. Saves to DB and redirects back
 * @param {*} objRep - saveToDB, path.join, fs.unlinkSync
 * @returns Redirect
 */
module.exports = (objRep) => {
	const { saveToDB, join, unlinkSync } = objRep;
	return (req, res, next) => {
		// Defines filepath
		const filePath = `../../storage/avatar/${res.locals.userIn.uid}.${res.locals.userIn.avatar}`;

		try {
			// Removes picture file from storage
			unlinkSync(join(__dirname, filePath));
			// Resets extension stored in user object
			res.locals.userIn.avatar = '';
		} catch (err) {
			if (err) return next(err);
		}
		return saveToDB(res.redirect(`/profile/${res.locals.userIn.uid}`));
	};
};
