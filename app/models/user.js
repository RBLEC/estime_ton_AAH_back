const { DataTypes, Model } = require(`sequelize`);
const sequelize = require(`../config/database`);

class User extends Model {};

// Premier parametre: la liste des valeurs dans le model (sans mettre les ids de relation)
User.init({
    // toute les propriétés sans les ids de relation dans le mld
    pseudo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
   
}, {
    sequelize,
    // le nom de la table
    tableName: `user`,
    timestamps: true
});


module.exports = User;