const db = require('../config/db.config.js');
const Post = db.post;


exports.create = (req, res) => {
    const postObject = JSON.parse(req.body.post);
    if(req.file){
        Post.create({
            ...postObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
            .then(() => res.status(201).json({
                message: 'Post créé !'
            }))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    } else {
        Post.create({
            ...postObject
        })
            .then(() => res.status(201).json({
                message: 'Post créé !'
            }))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }
    
    
}

exports.findAll = (req, res) => {
    Post.findAll().then(post => {
        res.send(post);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = (req,res) => {
	Post.destroy({
		where: {
			uuid: req.params.id
		}
	})
    .then(() => res.status(201).json({
        message: 'Post supprimé !'
    }))
	.catch(err => {
		res.status(500).send({
			message: err.message
		});
	});
}