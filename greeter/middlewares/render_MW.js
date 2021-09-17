/**
 * Renders the ejs chosen by parameter and sends to user
 * 
 * @param {*} view  – the ejs file to render
 * @returns next()
 */
module.exports = (view, redirectTo) => {
	return (req, res, next) => {
		if (typeof redirectTo !== 'undefined') {
			res.locals.redirectTo = redirectTo === 'feed' ? `/feed/${req.params.whichfeed}` : redirectTo;
		}
		res.locals.context = {
			...res.locals.context,
			scrollpx: req.session.scroll || 0
		}
		req.session.scroll = 0;
		res.render(res.locals.toRender || view, res.locals.context);
	};
};
