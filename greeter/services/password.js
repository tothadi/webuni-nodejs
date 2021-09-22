const crypto = require('crypto')
/**
 * Generates a hashed password to be stored in the db
 * 
 * @param {*} password - Password from user from
 * @returns hash
 */
function genPassHash(password) {
	const secret = process.env.SECRET || 'itsSomeKindOfMagic';
	const hash = crypto.pbkdf2Sync(password, secret, 1000, 64, 'sha512').toString('hex');
	return hash;
}

module.exports.genPassHash = genPassHash;


/**
 * Checks if password equals with hash stored in db
 * 
 * @param {*} reqPassword - Password provided by user
 * @param {*} dbPassword - Password stored in db
 * @returns Boolean
 */
function checkPassHash(reqPassword, dbPassword) {
	const secret = process.env.SECRET || 'itsSomeKindOfMagic';
	return dbPassword === crypto.pbkdf2Sync(reqPassword, secret, 1000, 64, 'sha512').toString('hex');
}

module.exports.checkPassHash = checkPassHash;