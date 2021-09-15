module.exports = () => {
	return (req, res, next) => {
		if (typeof req.session.signInError === 'undefined' && typeof req.session.signUpError === 'undefined') {
			return next();
		}
		let context = typeof req.session.signInError === 'undefined' ? { signUpError: req.session.signUpError } :  { signInError: req.session.signInError };
		delete req.session.signInError;
		delete req.session.signUpError
		return res.render('index', context);
	};
};
