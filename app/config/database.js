
// connection à la database
const {Sequelize} = require(`sequelize`);

const sequelize = new Sequelize(process.env.PG_URL_PROD, 

  {
    define: {
      timestamps: false,
      createdAt: `created_at`,
      updatedAt: `updated_at`
    },
    logging: false
  }
);

module.exports = sequelize;