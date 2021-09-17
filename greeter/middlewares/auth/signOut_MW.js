/**
 * Destroys session and redirects the user to '/'
 *
 * @param {*}
 * @returns next()
 */
module.exports = () => {
	return (req, res, next) => {
		req.session.destroy((err) => {
			if (err) console.error('Session destroy:', err.message);
		});
		return res.redirect('/');
	};
};
