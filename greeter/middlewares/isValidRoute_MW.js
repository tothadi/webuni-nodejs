/**
 * Filters routes starting with '/feed'
 * @returns next
 */
module.exports = () => {
	return (req, res, next) => {
		if (req.params.whichfeed !== 'public' && req.params.whichfeed !== 'followed') {
            res.redirect('/');
		}
		return next();
	};
};
