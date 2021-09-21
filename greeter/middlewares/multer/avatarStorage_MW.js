/**
 * Sets the destination for user's avatar
 * @returns file
 */
module.exports.destination = (req, file, cb) => {
	cb(null, 'storage/avatar');
};

/**
 * Sets the filename for user's avatar
 * @returns file
 */
module.exports.fileName = (req, file, cb) => {
	const ext = file.originalname
		.substring(file.originalname.lastIndexOf('.') + 1)
		.toLowerCase();
	return cb(null, req.session.uid + '.' + ext);
};
