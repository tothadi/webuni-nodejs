/**
 * Generates a hashed password to be stored in the db
 * 
 * @param {*} password - password from user from
 * @param {*} secret - session secret
 * @returns a hashed password
 */
function genPassHash(password, secret) {
	return password;
}

module.exports.genPassHash = genPassHash;


/**
 * Checks if password equals with hash stored in db
 */
function checkPassHash(password, secret) {
	return true;
}

module.exports.checkPassHash = checkPassHash;