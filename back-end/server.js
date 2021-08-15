var express = require('express');
var app = express();
const path = require('path')
var bodyParser = require('body-parser');

const crypto = require('crypto')

hash = crypto.getHashes();

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

require('./routes/auth.routes')(app);
require('./routes/users.routes')(app);
require('./routes/profile.routes')(app);
require('./routes/post.routes')(app);
require('./routes/topic.routes')(app);
require('./routes/comments.routes')(app);

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOptions))

app.use('/images/', express.static(path.join(__dirname, 'images')));


// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

const db = require('./config/db.config.js');
const User = db.user;
const Profile = db.profile;

var bcrypt = require("bcrypt");

function initial() {

  var user;
  User.create({
    email: crypto.createHash('sha1').update("moderateur@groupomania.fr").digest('hex'),
    password: bcrypt.hashSync('Modgroupomania_p7', 8),
    role: "moderateur"
      })
      .then(createdUser => {
          user = createdUser

          Profile.create({
                  fullname: "Modérateur",
                  job: "Chargé de communication"
              })
              .then(profile => {
                  user.setProfile(profile)
              })
      })
      .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
      }))
      .catch(err => {
          res.status(500).send({
              error: err.message
          });
      });
}



db.sequelize.sync();


//initialise la BDD


// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// initial();
// });
