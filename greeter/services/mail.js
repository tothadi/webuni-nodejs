/**
 * Send an email to the user with a secret link for password change
 * 
 * Development: logs recovery link to console
 * Production: Send the link via email using node-mailer
 * 
 * @param {*} userAddress 
 */
function sendUserMail (userAddress, secret) {
    const recoveryLink = `/new-pw/${secret}`
    console.log('sending email: ', recoveryLink);
    return {
        status: 'success',
        message: `A linket a(z) ${userAddress} címre kiküldtük!`
    }
}

module.exports.sendUserMail = sendUserMail;