const controller = require("../controllers/topic.controller");
const multer = require('../middleware/multer-config')

module.exports = function(app) {
    
    app.get('/api/topics', controller.findAll);
    
    app.get('/api/topic/:id', controller.findOne);
    
    app.post('/api/topic/create', multer, controller.create);

    app.delete('/api/topic/delete/:id', controller.delete);

  
  };