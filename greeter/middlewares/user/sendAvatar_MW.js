module.exports = (objRep) => {
	const { join } = objRep;
	return (req, res, next) => {
		const filePath = join(
			__dirname,
			`../../profile/avatar/${res.locals.user.uid}.${res.locals.user.avatar}`
		);
		res.sendFile(filePath);
	};
};
