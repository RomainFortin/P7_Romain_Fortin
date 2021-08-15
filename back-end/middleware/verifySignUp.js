const db = require('../config/db.config.js');
const User = db.user;

const crypto = require('crypto')

hash = crypto.getHashes();

checkDuplicateEmail = (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: crypto.createHash('sha1').update(req.body.email).digest('hex')
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Utilisateur déjà existant"
        });
        return;
      }

      next();
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;