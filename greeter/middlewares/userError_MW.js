module.exports = () => {
	return (req, res, next) => {
		if (typeof req.session.signInError === 'undefined') {
			return next();
		}
		let context = { errorMessage: req.session.signInError };
		return res.render('index', context);
	};
};
