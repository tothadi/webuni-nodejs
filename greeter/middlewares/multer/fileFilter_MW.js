/**
 * Checks's if mimetype of the uploaded file is image
 * 
 * 1. If file is image, returns it
 * 2. If file is not image, creates an error feedback available after redirect
 * @returns file
 */
module.exports = (req, file, cb) => {
	// Defines accepted mimetypes
	const fileTypes = [
		'image/jpg',
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/svg+xml',
		'image/webp',
	];

	// Returns qualifing files
	if (fileTypes.includes(file.mimetype)) {
		return cb(null, true);
	}

	// Creates error feedback - available after redirect
	req.session.feedBack = {
		fbType: 'fbError',
		initiator: 'setGreet',
		message: `A ${file.originalname} nevű kép formátuma nem megfelelő, nem került feltöltésre!`,
	};
	cb(null, false);
};
