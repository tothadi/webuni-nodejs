/**
 * Deletes greet pics from storage
 * 
 * 1. Greet delete - removes all greet pictures from storage
 * 2. Greet edit - removes given pictures from storage
 * @param {*} objRep - path.join, fs.readdirSync, fs.unlinkSync
 * @returns next
 */
module.exports = (objRep) => {
	const { join, readdirSync, unlinkSync } = objRep;
	return (req, res, next) => {
		// Only tries to delete on greet editing or greet deleting
		if (!res.locals.isNew) {
			try {
				const fileNames =
					typeof req.body.removed === 'undefined'
						? readdirSync(join(__dirname, '../../storage/greets')).filter((f) =>
								f.includes(req.params.gid)
						  )
						: res.locals.greet.pics.filter(pic => !res.locals.greetPics.includes(pic));

				fileNames.forEach((file) => {
					unlinkSync(join(__dirname, '../../storage/greets', file));
				});
			} catch (err) {
				if (err) return next(err);
			}
		}
		return next();
	};
};
