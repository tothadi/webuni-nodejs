/**
 * Renders the ejs chosen by parameter and sends to user
 *
 * 1. If there's redirect route defined in parameter, sets res.locals.redirectTo to the provided
 * 2. Else defines res.locals.redirectTo coming from reqest body
 * 3. Passes data to the rendered ejs in res.locals.context (Feedback, where to scroll in browser)
 * 4. Resets req.session.scroll to 0
 * 5. Renders ejs defined in res.locals.toRender or if it's not available, then the one provided in parameter
 * @param {*} view – the ejs file to render
 * @param {*} redirectTo – the route where to redirect
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

		// Sets context for render
		res.locals.context = {
			...res.locals.context,
			scrollpx: req.session.scroll || 0,
		};

		// Resets scroll
		req.session.scroll = 0;
		return res.render(res.locals.toRender || view, res.locals.context);
	};
};
