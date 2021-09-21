/**
 * Checks is picture already exists, if exists adds it to filtered, if not returns the file
 * @returns file
 */
module.exports = (req, file, cb) => {
	const fileTypes = [
		'image/jpg',
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/svg+xml',
		'image/webp',
	];
	if (fileTypes.includes(file.mimetype)) {
		return cb(null, true);
	}
	req.session.feedBack = {
		fbType: 'fbError',
		initiator: 'setGreet',
		message: `A ${file.originalname} nevű kép formátuma nem megfelelő, nem került feltöltésre!`,
	};
	cb(null, false);
};
