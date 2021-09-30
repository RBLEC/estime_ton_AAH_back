const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class Comment extends Model {};

Comment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: `comment`,
    timestamps: true
});

module.exports = Comment;