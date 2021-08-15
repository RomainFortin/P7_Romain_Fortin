const db = require('../config/db.config.js');
const Topic = db.topic;


exports.create = (req, res) => {
    const topicObject = JSON.parse(req.body.topic);

    if(req.file){
        Topic.create({
            ...topicObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
            .then(() => res.status(201).json({
                message: 'Topic créé !'
            }))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    } else {
        Topic.create({
            ...topicObject
        })
            .then(() => res.status(201).json({
                message: 'Topic créé !'
            }))
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }
    
    
}

exports.findAll = (req, res) => {
    Topic.findAll().then(topic => {
        res.send(topic);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findOne = (req, res) => {
    Topic.findOne({
        where: {
			uuid: req.params.id
		}
        })
        .then(topic => {
            res.send(topic);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.delete = (req, res) => {
    Topic.destroy({
        where: {
			uuid: req.params.id
		}
        })
        .then(() => res.status(201).json({
            message: 'Topic supprimé !'
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};