module.exports = (sequelize, Sequelize) => {
	const Profile = sequelize.define('profile', {
	  fullname: {
		  type: Sequelize.STRING
	  },
	  job: {
		type: Sequelize.STRING
	}
	});
	
	return Profile;
}