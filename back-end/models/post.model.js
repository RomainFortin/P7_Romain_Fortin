module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        author: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        }
    });

    return Post;
}