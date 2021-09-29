/**
 * Renders the ejs chosen by parameter and sends to user
 *
 * 1. If there's redirect route defined in parameter, sets res.locals.redirectTo to the provided
 * 2. Else defines res.locals.redirectTo coming from reqest body
 * 5. Renders ejs provided in parameter
 * @param {*} view – the ejs file to render
 * @param {*} redirectTo – the route where to redirect from post request in view rendered
 * @returns Render
 */
module.exports = (view, redirectTo) => {
	return (req, res, next) => {
		// If redirectTo provided in paramater sets res.locals.redirectTo by that else by the one in req.body
		if (typeof redirectTo !== 'undefined') {
			res.locals.redirectTo =
				redirectTo === 'feed' ? `/feed/${req.params.whichfeed}` : redirectTo;
		} else {
			res.locals.redirectTo = req.body.redirectTo;
		}
		return res.render(view);
	};
};
