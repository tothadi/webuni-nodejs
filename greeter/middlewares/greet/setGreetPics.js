module.exports = (objRep) => {
	const { fileExts } = objRep;
	return (req, res, next) => {
        res.locals.greetPics = [];
		req.files.forEach((file) => {
			const ext = file.originalname
				.substring(file.originalname.lastIndexOf('.') + 1)
				.toLowerCase();
			if (!fileExts.includes(ext)) {
				req.session.feedBack = {
					fbType: 'fbError',
					initiator: 'setAvatar',
					message: 'A kép formátuma nem megfelelő feltöltése nem sikerült!',
				};
				return res.redirect(req.body.redirectTo);
			}
            res.locals.greetPics.push(file.filename);
		});
		return next();
	};
};
