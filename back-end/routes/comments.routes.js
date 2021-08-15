const controller = require("../controllers/comments.controller");
const multer = require('../middleware/multer-config')

module.exports = function(app) {
    
    app.get('/api/comments/:id', controller.findAll);
    
    app.post('/api/comments/create', multer, controller.create);

    app.delete('/api/comment/delete/:id', controller.delete);

  
  };