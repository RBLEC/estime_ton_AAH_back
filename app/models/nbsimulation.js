const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class Nbsimulation extends Model {};

Nbsimulation.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: `nbsimulation`,
    timestamps: true
});

module.exports = Nbsimulation;