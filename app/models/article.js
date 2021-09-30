const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class Article extends Model {};

Article.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: `article`,
    timestamps: true
});

module.exports = Article;