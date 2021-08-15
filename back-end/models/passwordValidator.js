const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(6)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()

module.exports = passwordSchema;