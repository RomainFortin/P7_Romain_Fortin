const controller = require("../controllers/post.controller");
const multer = require('../middleware/multer-config')

module.exports = function(app) {
    
    app.get('/api/posts', controller.findAll);
    
    app.post('/api/post/create', multer, controller.create);

    app.delete('/api/post/delete/:id', controller.delete);

  
  };