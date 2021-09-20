module.exports = (objRep) => {
	const { join } = objRep;
	return (req, res, next) => {
		const filePath = join(
			__dirname,
			`../../storage/greets/${req.params.filename}`
		);
		res.sendFile(filePath);
	};
};