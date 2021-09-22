/**
 * Creates an array of picture filenames to be saved to greet
 * 
 * In case of editing, removes removable pics from the array
 * In case of new uploads, adds new picture filenames to the array
 * @returns next
 */
module.exports = () => {
	return (req, res, next) => {
		// Editing
		if (!res.locals.isNew) {
			res.locals.greetPics = res.locals.greet.pics.filter(
				(pic) => !req.body.removed.includes(pic)
			);
		}
		
		// Adding newly uploaded picture filenames to array
		if (typeof req.files !== 'undefined') {
			req.files.forEach((file) => {
				res.locals.greetPics.push(file.filename);
			});
		}
		return next();
	};
};
