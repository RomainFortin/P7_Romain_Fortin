const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.user = require('../models/user.model')(sequelize, Sequelize);
db.profile = require('../models/profile.model')(sequelize, Sequelize);
db.post = require('../models/post.model')(sequelize, Sequelize);
db.topic = require('../models/topic.model')(sequelize, Sequelize);
db.comments = require('../models/comments.model')(sequelize, Sequelize);

db.user.hasOne(db.profile, {foreignKey: 'fk_userid', targetKey: 'uuid', onDelete: 'CASCADE'});
db.user.hasMany(db.post, {foreignKey: 'fk_userid', targetKey: 'uuid', onDelete: 'CASCADE'});
db.user.hasMany(db.topic, {foreignKey: 'fk_userid', targetKey: 'uuid', onDelete: 'CASCADE'});

db.profile.belongsTo(db.user, {foreignKey: 'fk_userid', targetKey: 'uuid'});

db.post.belongsTo(db.user, {foreignKey: 'fk_userid', targetKey: 'uuid'});

db.topic.belongsTo(db.user, {foreignKey: 'fk_userid', targetKey: 'uuid'});
db.topic.hasMany(db.comments, {foreignKey: 'fk_topicid', targetKey: 'uuid', onDelete: 'CASCADE'});

db.comments.belongsTo(db.topic, {foreignKey: 'fk_topicid', targetKey: 'uuid'});
 
module.exports = db;