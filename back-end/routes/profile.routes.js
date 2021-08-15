const controller = require("../controllers/profile.controller");

module.exports = function(app) {
    
    app.post('/api/profile', controller.findOne);

    app.put('/api/profile/update', controller.update);
  
  };