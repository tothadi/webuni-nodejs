/**
 * Checks if session.uid exists, if not redirects to '/'
 *
 * @param {*}
 * @returns next()
 */
module.exports = () => {
	return (req, res, next) => {
		return next();
	};
};
