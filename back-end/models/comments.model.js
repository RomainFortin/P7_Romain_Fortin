module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define('comments', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        author: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        }
    });

    return Comments;
}