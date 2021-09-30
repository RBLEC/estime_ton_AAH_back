const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class Income extends Model {};

Income.init({
    year: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    situation: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    nb_child: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
}, {
    sequelize,
    tableName: "income"
});

module.exports = Income;