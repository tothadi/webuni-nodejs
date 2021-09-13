/**
 * Renders the ejs chosen by parameter and sends to user
 * 
 * @param {*} view  – the ejs file to render
 * @returns next()
 */
module.exports = (view) => {
	return (req, res, next) => {
		return next();
	};
};
