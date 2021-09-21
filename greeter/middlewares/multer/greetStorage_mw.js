/**
 * Sets the destination for greet pictures
 * @returns file
 */
module.exports.destination = (req, file, cb) => {
	cb(null, 'storage/greets');
};

/**
 * Sets filename for greet pictures
 * @returns file
 */
module.exports.fileName = (req, file, cb) => {
	const ext = file.originalname
		.substring(file.originalname.lastIndexOf('.') + 1)
		.toLowerCase();
	const fileName = `${req.session.gid}_${Date.now()}.${ext}`;
	return cb(null, fileName);
};
