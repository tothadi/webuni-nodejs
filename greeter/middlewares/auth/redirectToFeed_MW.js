/**
 * If a logged-in user navigates to '/', redirects back to feed
 * 
 * @returns void
 */
module.exports = () => {
	return (req, res, next) => {
		if (typeof req.session.uid === 'undefined') {
			return next();
		}
		res.redirect('/feed/followed');
	};
};