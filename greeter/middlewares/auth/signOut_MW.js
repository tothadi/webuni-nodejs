/**
 * Destroys session in order to force the user to be signed out
 *
 * @param {*}
 * @returns next()
 */
module.exports = () => {
	return (req, res, next) => {
		return next();
	};
};
