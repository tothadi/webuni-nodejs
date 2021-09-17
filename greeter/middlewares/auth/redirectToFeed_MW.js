
module.exports = () => {
	return (req, res, next) => {
		if (typeof req.session.uid === 'undefined') {
			return next();
		}
		res.redirect('/feed/followed');
	};
};