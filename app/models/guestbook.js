const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class Guestbook extends Model {};

Guestbook.init({
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
    tableName: `guestbook`,
    timestamps: true
});

module.exports = Guestbook;