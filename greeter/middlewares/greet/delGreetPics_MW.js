/**
 *
 * @param {*} objRep
 * @returns
 */
module.exports = (objRep) => {
	const { join, readdirSync, unlinkSync } = objRep;
	return (req, res, next) => {
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
