const controller = require("../controllers/users.controller");

module.exports = function(app) {
    
  app.get('/api/users', controller.findAll);

  app.post('/api/user', controller.findOne);

  app.delete('/api/user/delete', controller.delete);

};