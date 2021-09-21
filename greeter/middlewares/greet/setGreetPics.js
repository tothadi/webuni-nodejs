module.exports = () => {
	return (req, res, next) => {
		if (!res.locals.isNew) {
			res.locals.greetPics = res.locals.greet.pics.filter(
				(pic) => !req.body.removed.includes(pic)
			);
		}
		
		console.log('setgreetpics: ', res.locals.greetPics)
		
		if (typeof req.files !== 'undefined') {
			req.files.forEach((file) => {
				res.locals.greetPics.push(file.filename);
			});
		}
		return next();
	};
};
