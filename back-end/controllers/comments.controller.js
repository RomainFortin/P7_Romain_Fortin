const db = require('../config/db.config.js');
const Comments = db.comments;


exports.create = (req, res) => {
    const commentsObject = JSON.parse(req.body.comments);
    if(req.file){
        Comments.create({
            ...commentsObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
            .then(() => res.status(201).json({
                message: 'Commentaire créé !'
            }))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    } else {
        Comments.create({
            ...commentsObject
        })
            .then(() => res.status(201).json({
                message: 'Commentaire créé !'
            }))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }
    
    
}

exports.findAll = (req, res) => {
    Comments.findAll({
        where: {
			fk_topicid: req.params.id
		}
        })
        .then(comment => {
            res.send(comment);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.delete = (req, res) => {
    Comments.destroy({
        where: {
			uuid: req.params.id
		}
        })
        .then(() => res.status(201).json({
            message: 'Commentaire supprimé !'
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};