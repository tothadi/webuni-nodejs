/**
 * Send an email to the user with a secret link for password change
 * 
 * @param {*} userAddress 
 */
function sendUserMail (userAddress, secret) {
    const recoveryLink = `/new-pw/${secret}`
    console.log('sending email: ', recoveryLink);
    return {
        fbType: 'fbSuccess',
        initiator: 'emailService',
        message: `A linket a(z) ${userAddress} címre kiküldtük!`
    }
}

module.exports.sendUserMail = sendUserMail;