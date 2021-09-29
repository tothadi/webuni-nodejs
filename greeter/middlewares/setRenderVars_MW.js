/**
 * Sets variables needed in rendered views
 * 
 * @returns next
 */
module.exports = () => {
	return (req, res, next) => {
        
        /* Routes before redirect */

		// Sets redirect url
		if (req.method === 'POST' && typeof req.body.redirectTo !== 'undefined') {
			req.session.redirectTo = req.body.redirectTo;
        }

		// Creates scroll data if it's present in req.body so browser knows where to scroll back
        if (req.method === 'POST' && typeof req.body.scroll !== 'undefined') {
            req.session.scroll =  req.body.scroll;
        }


		/* Routes after redirect */

		// Sets redirect url
		if (req.method === 'GET' && typeof req.session.redirectTo !== 'undefined') {
			res.locals.redirectTo = req.session.redirectTo;
        }
        
        // Sets the feedback for rendering
		if (typeof req.session.feedBack !== 'undefined') {
			res.locals.feedBack = req.session.feedBack;
			delete req.session.feedBack;
		}

		// If modal to be opened after redirect is set, creates res.locals.modal
		if (typeof req.session.modal !== 'undefined') {
			res.locals.modal = req.session.modal;
			delete req.session.modal;
		}

        // Sets where to scroll after rendering, and deletes it from session
        if (req.method === 'GET' && typeof req.session.scroll !== 'undefined') {
            res.locals.scrollToElem = req.session.scroll;
            delete req.session.scroll
        }

		return next();
	};
};
