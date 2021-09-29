/**
 * Filters routes starting with '/feed'
 * 
 * Only /feed/followed and /feed/public works
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
