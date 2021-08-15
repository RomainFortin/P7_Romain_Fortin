const db = require('../config/db.config.js');
const Profile = db.profile;


exports.findOne = (req, res) => {
	Profile.findOne({
		where: {
			fk_userid: req.body.userId
		}
	}).then(profile => {
	   res.send(profile);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};

exports.update = (req, res) => {
	Profile.findOne({
		where: {
			fk_userid: req.body.userId
		}
	}).then(profile => {
		profile.update({
			fullname: req.body.fullname,
			job: req.body.job
		})
	   res.send(profile);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
};