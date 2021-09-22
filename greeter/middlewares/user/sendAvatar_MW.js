/**
 * Sends user's avatar to already rendered page
 * 
 * @param {*} objRep - path.join
 * @returns SendFile
 */
module.exports = (objRep) => {
	const { join } = objRep;
	return (req, res, next) => {
		const filePath = join(
			__dirname,
			`../../storage/avatar/${res.locals.user.uid}.${res.locals.user.avatar}`
		);
		res.sendFile(filePath);
	};
};
