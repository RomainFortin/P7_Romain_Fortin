const db = require('../config/db.config.js');
const User = db.user;
const Profile = db.profile;

const crypto = require('crypto')

hash = crypto.getHashes();

exports.findAll = (req, res) => {
	User.findAll({
        attributes: [['uuid', 'userId'], ['email', 'email']],
		include: [{
			model: Profile,
			attributes: ['fullname', 'job']
		}]
	}).then(users => {
	   res.send(users);
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

exports.findOne = (req, res) => {
	User.findOne({
		where: {
			email: crypto.createHash('sha1').update(req.body.email).digest('hex')
		},
        attributes: [['uuid', 'userId'], ['email', 'email'], ['role','role']],
		include: [{
			model: Profile,
			attributes: ['fullname', 'job']
		}]
	}).then(user => {
	   res.send(user);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

exports.delete = (req,res) => {
	User.destroy({
		where: {
			uuid: req.body.userId
		}
	})
	.then(() => res.status(201).json({
        message: 'Utilisateur supprimé !'
    }))
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
}