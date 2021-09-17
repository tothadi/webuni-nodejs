module.exports = () => {
	return (req, res, next) => {
		if (typeof req.session.feedBack === 'undefined') {
			return next();
		}

		switch (req.session.feedBack.initiator) {
			case 'signIn':
				res.locals.context = {
					userError: { signInError: req.session.feedBack.message },
				};
				res.locals.toRender = 'index';
				break;
			case 'signUp':
				res.locals.context = {
					userError: { signUpError: req.session.feedBack.message },
				};
				res.locals.toRender = 'index';
				break;
			case 'setAvatar':
				res.locals.context = {
					userError: { signUpError: req.session.feedBack.message },
				};
				res.locals.toRender = 'profile/profile';
				break;
			case 'setGreet':
				res.locals.context =
					req.session.feedBack.fbType === 'fbError'
						? {
								greetFeedBack: {
									status: 'danger',
									message: req.session.feedBack.message,
								},
						  }
						: {
								greetFeedBack: {
									status: 'success',
									message: req.session.feedBack.message,
								},
						  };
				res.locals.toRender = 'feed';
				break;
			default:
				res.locals.context = {};
				res.locals.toRender = 'index';
				break;
		}
		delete req.session.feedBack;
		return next();
	};
};
