/**
 * Specifies context with error/success messages for renderer based on where the feedback was created
 * Specifies the ejs to be rendered based on where the feedback was created
 *
 * @returns next
 */
module.exports = () => {
	return (req, res, next) => {
		// In vain of feedback returns next
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
			case 'emailService':
				res.locals.context =
					req.session.feedBack.fbType === 'fbError'
						? {
								emailFeedBack: {
									status: 'danger',
									message: req.session.feedBack.message,
								},
						  }
						: {
								emailFeedBack: {
									status: 'success',
									message: req.session.feedBack.message,
								},
						  };
				res.locals.toRender = 'index';
				break;
			case 'updateUser':
				res.locals.context =
					req.session.feedBack.fbType === 'fbError'
						? {
								profileFeedBack: {
									status: 'danger',
									message: req.session.feedBack.message,
								},
						  }
						: {
								profileFeedBack: {
									status: 'success',
									message: req.session.feedBack.message,
								},
						  };
				res.locals.toRender = 'profile/profile';
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
